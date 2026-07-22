import { NextResponse } from "next/server";

export const runtime = 'edge';

export async function GET() {
  try {
    const db = (process.env as any).DB;
    
    // अगर डेटाबेस कनेक्टेड है तो D1 से लाएगा, वर्ना फॉलबैक डेटा देगा
    if (db) {
      const { results } = await db.prepare("SELECT * FROM recycling_points").all();
      if (results.length > 0) {
        return NextResponse.json({ success: true, points: results });
      }
    }

    // Fallback Production Data 
    const fallbackPoints = [
      { id: 1, name: "AMC E-Waste Collection Center", address: "Navrangpura Ward, Zone 3", accepted_types: "E-Waste, Hazardous" },
      { id: 2, name: "Smart Manufacturing Eco-Bin", address: "CIPET Campus, Phase IV", accepted_types: "Recyclable, Plastics" },
      { id: 3, name: "Vastrapur Compost Plant", address: "Vastrapur Lake Road", accepted_types: "Compostable, Organic" }
    ];

    return NextResponse.json({ success: true, points: fallbackPoints });
  } catch (error) {
    console.error("Fetch Points Error:", error);
    return NextResponse.json({ success: false, error: "डेटा लोड करने में विफल" }, { status: 500 });
  }
}