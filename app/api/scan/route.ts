import { NextResponse } from "next/server";
import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const { image, userId } = await request.json();

    if (!image) {
      return NextResponse.json({ success: false, message: "इमेज प्राप्त नहीं हुई।" }, { status: 400 });
    }

    // Cloudflare Pages के सर्वर से API Key और Database (D1) निकालने का सही तरीका
    let env: any = {};
    try {
      env = getRequestContext().env;
    } catch (e) {
      env = process.env; // लोकल टेस्टिंग के लिए फॉलबैक
    }

    const MODEL_ID = env.ROBOFLOW_MODEL_ID || process.env.ROBOFLOW_MODEL_ID;
    const API_KEY = env.ROBOFLOW_API_KEY || process.env.ROBOFLOW_API_KEY;

    // अगर Cloudflare पर की (Key) नहीं मिली, तो 500 की जगह प्रॉपर एरर मैसेज भेजें
    if (!MODEL_ID || !API_KEY) {
      return NextResponse.json(
        { success: false, error: "Cloudflare डैशबोर्ड में API Key सेट नहीं है! कृपया Settings > Environment variables चेक करें।" }, 
        { status: 500 }
      );
    }

    // Roboflow API कॉल
    const aiResponse = await fetch(
      `https://detect.roboflow.com/${MODEL_ID}/1?api_key=${API_KEY}`,
      {
        method: "POST",
        body: image,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    if (!aiResponse.ok) {
      return NextResponse.json(
        { success: false, error: `Roboflow API क्रैश हो गई। (Status: ${aiResponse.status})` }, 
        { status: 500 }
      );
    }

    const aiData = await aiResponse.json();
    const topPrediction = aiData.predictions?.[0];

    if (!topPrediction) {
      return NextResponse.json({ success: false, message: "कचरे की स्पष्ट पहचान नहीं हो सकी।" }, { status: 200 });
    }

    const category = topPrediction.class;
    const confidence = topPrediction.confidence;

    let points = 10;
    let instruction = "इसे रीसाइक्लिंग बिन में डालें।";
    const lowerCategory = category.toLowerCase();

    if (lowerCategory.includes("compost") || lowerCategory.includes("organic")) {
      instruction = "यह गीला कचरा है। खाद केंद्र पर भेजें।"; points = 15;
    } else if (lowerCategory.includes("hazard")) {
      instruction = "यह खतरनाक कचरा है! विशेष सावधानी बरतें।"; points = 25;
    } else if (lowerCategory.includes("e-waste") || lowerCategory.includes("electronic")) {
      instruction = "यह ई-वेस्ट है। कलेक्शन सेंटर पर दें।"; points = 30;
    }

    // Cloudflare D1 Database Operations
    const db = env.DB;
    if (db) {
      const activeUserId = userId || "Rishi_Raj"; // तुम्हारी प्रोफाइल के अनुसार 
      
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
    console.error("Scan API Error:", error);
    return NextResponse.json({ success: false, error: `सर्वर एरर: ${error.message}` }, { status: 500 });
  }
}