import { NextResponse } from "next/server";

export async function GET() {
  // डमी डेटा (इसे आप Cloudflare D1 डेटाबेस से भी फेच कर सकते हैं)
  const recyclingPoints = [
    { id: 1, name: "EcoCollection Center - Ward 4", address: "Main Market Road", accepted_types: "Recyclable, E-Waste" },
    { id: 2, name: "Green Compost Plant", address: "Industrial Area, Sector 2", accepted_types: "Compostable" },
    { id: 3, name: "Hazardous Waste Disposal Unit", address: "City outskirts, Highway", accepted_types: "Hazardous" }
  ];

  return NextResponse.json({ success: true, points: recyclingPoints });
}