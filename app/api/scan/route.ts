import { NextResponse } from "next/server";

// Cloudflare Workers / D1 के लिए Edge Runtime अनिवार्य है
export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { image, userId } = await request.json();

    if (!image) {
      return NextResponse.json({ success: false, message: "इमेज प्राप्त नहीं हुई।" }, { status: 400 });
    }

    const MODEL_ID = process.env.ROBOFLOW_MODEL_ID;
    const API_KEY = process.env.ROBOFLOW_API_KEY;

    // रोबोफ्लो API कॉल
    const aiResponse = await fetch(
      `https://detect.roboflow.com/${MODEL_ID}/1?api_key=${API_KEY}`,
      {
        method: "POST",
        body: image,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (!aiResponse.ok) {
      throw new Error(`Roboflow API error: ${aiResponse.statusText}`);
    }

    const aiData = await aiResponse.json();
    const topPrediction = aiData.predictions?.[0];

    if (!topPrediction) {
      return NextResponse.json({
        success: false,
        message: "कचरे की स्पष्ट पहचान नहीं हो सकी।",
      });
    }

    const category = topPrediction.class;
    const confidence = topPrediction.confidence;

    let points = 10;
    let instruction = "इसे रीसाइक्लिंग बिन में डालें।";
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("compost") || lowerCategory.includes("organic")) {
      instruction = "यह कम्पोस्टेबल (गीला) कचरा है। खाद केंद्र पर भेजें।";
      points = 15;
    } else if (lowerCategory.includes("hazard")) {
      instruction = "यह खतरनाक कचरा है! विशेष सावधानी बरतें।";
      points = 25;
    } else if (lowerCategory.includes("e-waste") || lowerCategory.includes("electronic")) {
      instruction = "यह ई-वेस्ट है। अधिकृत कलेक्शन सेंटर पर दें।";
      points = 30;
    }

    // Cloudflare D1 Database Operations
    const db = (process.env as any).DB;
    if (db) {
      const activeUserId = userId || "Rishi_Raj"; // Default User ID
      
      await db.prepare(
        `INSERT INTO scan_history (user_id, waste_category, confidence_score, points_awarded) VALUES (?, ?, ?, ?)`
      ).bind(activeUserId, category, confidence, points).run();

      // अगर यूजर नहीं है, तो इग्नोर करेगा, अन्यथा अपडेट करेगा
      await db.prepare(
        `UPDATE users SET green_points = green_points + ? WHERE id = ?`
      ).bind(points, activeUserId).run();
    }

    return NextResponse.json({
      success: true,
      category,
      confidence,
      disposalInstruction: instruction,
      pointsAwarded: points,
    });

  } catch (error) {
    console.error("Scan API Error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}