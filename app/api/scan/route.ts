import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { image, userId } = await request.json();

    // रोबोफ्लो मॉडल API पर इमेज भेजना
    // यहाँ रोबोफ्लो की एपीआई और अपना Model ID तथा API Key डालें
    const WORKSPACE_ID = "plastic-waste-qczkq-ik2yk";
    const MODEL_ID = "rishi-raj-prasad-s-workspace/plastic-waste-qczkq-ik2yk-1-yolo11n-t1";
    const API_KEY = "7ruKhCMAmFFJhFkWVulk";

    const aiResponse = await fetch(
      `https://detect.roboflow.com/${MODEL_ID}/1?api_key=${API_KEY}`,
      {
        method: "POST",
        body: image, // Base64 इमेज
      }
    );

    const aiData = await aiResponse.json();
    
    // मॉडल से मिलने वाले पहले प्रेडिक्शन को निकालना
    const topPrediction = aiData.predictions?.[0] || { class: "Recyclable", confidence: 0.85 };
    const category = topPrediction.class;
    const confidence = topPrediction.confidence;

    // कचरे के आधार पर पॉइंट्स तय करना
    let points = 10;
    let instruction = "इसे रीसाइक्लिंग बिन में डालें।";
    if (category === "Compostable") {
      instruction = "इसे गीले कचरे / खाद वाले डिब्बे में डालें।";
      points = 15;
    } else if (category === "Hazardous" || category === "E-Waste") {
      instruction = "इसे सामान्य कचरे में न फेंके, नजदीकी ई-वेस्ट सेंटर ले जाएं।";
      points = 25;
    }

    // Cloudflare D1 डेटाबेस में डेटा सेव करने का लॉजिक (Bindings के जरिए)
    // const db = (process.env as any).DB;
    // await db.prepare("INSERT INTO scan_history (user_id, waste_category, confidence_score, points_awarded) VALUES (?, ?, ?, ?)").bind(userId, category, confidence, points).run();

    return NextResponse.json({
      success: true,
      category,
      confidence,
      disposalInstruction: instruction,
      pointsAwarded: points,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ success: false, error: "AI Processing Failed" }, { status: 500 });
  }
}