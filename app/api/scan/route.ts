import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { image, userId } = await request.json();

    if (!image) {
      return NextResponse.json({ success: false, message: "इमेज प्राप्त नहीं हुई।" }, { status: 400 });
    }

    // 1. Base64 स्ट्रिंग को क्लीन करना (थोड़ा बेहतर किया है ताकि webp/jpeg सब चले)
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

    // 2. Cloudflare से Environment Variables निकालना
    let env: any = {};
    try {
      env = getRequestContext().env;
    } catch (e) {
      env = process.env; 
    }

    // तुम्हारी असली API Key
    const API_KEY = env.ROBOFLOW_API_KEY || "7ruKhCMAmFFJhFkWVulk"; 
    
    // तुम्हारा वर्कफ़्लो URL
    const ROBOFLOW_WORKFLOW_URL = "https://serverless.roboflow.com/rishi-raj-prasad-s-workspace/workflows/plastic-waste-qczkq-ik2yk";

    // 3. Roboflow Workflows को तुम्हारे फॉर्मेट में रिक्वेस्ट भेजना
    const aiResponse = await fetch(ROBOFLOW_WORKFLOW_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        api_key: API_KEY,
        inputs: {
          image: { 
            type: "base64", 
            value: base64Data 
          }
        }
      })
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      return NextResponse.json(
        { success: false, error: `Roboflow API क्रैश (Status: ${aiResponse.status}). Details: ${errorText}` }, 
        { status: 500 }
      );
    }

    const aiData = await aiResponse.json();

    // 4. वर्कफ़्लो के रिस्पॉन्स से डेटा निकालना
    let category = "Unknown";
    let confidence = 0;

    const responseString = JSON.stringify(aiData);
    
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
           confidence = aiData.confidence || 0.8;
       }
    } catch (e) {
       console.error("Parsing workflow response failed", e);
    }

    if (category === "Unknown") {
      return NextResponse.json({ 
        success: false, 
        message: "मॉडल को कचरा समझ नहीं आया।", 
        debugData: aiData 
      }, { status: 200 });
    }

    // 5. कचरे की कैटेगरी के अनुसार पॉइंट्स और निर्देश
    let points = 10;
    let instruction = "इसे रीसाइक्लिंग बिन में डालें।";
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("compost") || lowerCategory.includes("organic") || lowerCategory.includes("food")) {
      instruction = "यह गीला/जैविक कचरा है। इसे खाद (Compost) वाले डिब्बे में डालें।"; 
      points = 15;
    } else if (lowerCategory.includes("hazard") || lowerCategory.includes("battery")) {
      instruction = "यह खतरनाक कचरा है! इसे सामान्य कचरे में न फेंके।"; 
      points = 25;
    } else if (lowerCategory.includes("e-waste") || lowerCategory.includes("electronic")) {
      instruction = "यह ई-वेस्ट है। इसे अधिकृत ई-वेस्ट कलेक्शन सेंटर पर दें।"; 
      points = 30;
    } else if (lowerCategory.includes("plastic") || lowerCategory.includes("bottle")) {
      instruction = "यह प्लास्टिक वेस्ट है। कृपया इसे रीसाइक्लिंग बिन में डालें।";
      points = 20;
    }

    // 6. Cloudflare D1 Database में सुरक्षित करना (जैसा आपने रखा था)
    const db = env.DB;
    if (db) {
      const activeUserId = userId || "rishi_raj_prasad"; 
      
      await db.prepare(
        `INSERT INTO scan_history (user_id, waste_category, confidence_score, points_awarded) VALUES (?, ?, ?, ?)`
      ).bind(activeUserId, category, confidence, points).run();

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

  } catch (error: any) {
    console.error("Workflow API Error:", error);
    return NextResponse.json({ success: false, error: `सर्वर एरर: ${error.message}` }, { status: 500 });
  }
}