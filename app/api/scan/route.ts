// app/api/scan/route.ts
import { NextResponse } from "next/server";
import { Pool } from "pg";

// Using Node standard runtime for DB compatibility, no 'edge' runtime specified
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request: Request) {
  try {
    const { image, userId } = await request.json();

    if (!image || !userId) {
      return NextResponse.json({ success: false, message: "Kindly! login to proceed" }, { status: 400 });
    }

    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const API_KEY = process.env.ROBOFLOW_API_KEY;
    const ROBOFLOW_WORKFLOW_URL = "https://serverless.roboflow.com/theobald2798-landers-gmail-com/workflows/segrigate";

    const aiResponse = await fetch(ROBOFLOW_WORKFLOW_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ api_key: API_KEY, inputs: { image: { type: "base64", value: base64Data } } })
    });

    if (!aiResponse.ok) {
      return NextResponse.json({ success: false, error: "AI Processing Failed" }, { status: 500 });
    }

    const aiData = await aiResponse.json();
    let category = "Unknown";
    let confidence = 0.8;

    try {
       const extractPredictions = (obj: any): any[] => {
          if (!obj) return [];
          if (Array.isArray(obj.predictions)) return obj.predictions;
          for (let key in obj) {
              if (typeof obj[key] === 'object') {
                  const res = extractPredictions(obj[key]);
                  if (res.length > 0) return res;
              }
          }
          return [];
       };
       const predictions = extractPredictions(aiData);
       if (predictions.length > 0) {
           predictions.sort((a, b) => b.confidence - a.confidence);
           category = predictions[0].class;
           confidence = predictions[0].confidence;
       } else if (aiData.top) {
           category = aiData.top;
       }
    } catch (e) {
       console.error("Parse failed");
    }

    if (category === "Unknown") {
      return NextResponse.json({ success: false, message: "Could not identify object." }, { status: 200 });
    }

    // Points calculation logic exactly as requested
    let points = 2; // Default for reuse/recycle
    let instruction = "इसे रीसाइक्लिंग बिन में डालें।";
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("compost") || lowerCategory.includes("organic") || lowerCategory.includes("food")) {
      instruction = "यह गीला/जैविक कचरा है। इसे खाद (Compost) वाले डिब्बे में डालें।"; 
      points = 1;
    } else if (lowerCategory.includes("hazard") || lowerCategory.includes("battery")) {
      instruction = "यह खतरनाक कचरा है! इसे सुरक्षित डिस्पोजल यूनिट में डालें।"; 
      points = 0.5;
    } else if (lowerCategory.includes("e-waste") || lowerCategory.includes("electronic")) {
      instruction = "यह ई-वेस्ट है। इसे अधिकृत ई-वेस्ट कलेक्शन सेंटर पर दें।"; 
      points = 2;
    }

    // Update PostgreSQL Database securely
    await pool.query(
      "INSERT INTO scan_history (user_id, waste_category, confidence_score, points_awarded) VALUES ($1, $2, $3, $4)",
      [userId, category, confidence, points]
    );

    await pool.query(
      "UPDATE users SET green_points = green_points + $1, scans_completed = scans_completed + 1 WHERE id = $2",
      [points, userId]
    );

    return NextResponse.json({
      success: true,
      category,
      confidence,
      disposalInstruction: instruction,
      pointsAwarded: points,
    });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: `Server Error: ${error.message}` }, { status: 500 });
  }
}