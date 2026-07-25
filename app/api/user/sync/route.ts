import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request: Request) {
  try {
    const { uid, email, name } = await request.json();

    if (!uid || !email) {
      return NextResponse.json({ success: false, message: "Missing user data" }, { status: 400 });
    }

    // यह क्वेरी यूज़र को डेटाबेस में डालेगी, और अगर यूज़र पहले से है तो कुछ नहीं करेगी (ON CONFLICT)
    await pool.query(
      `INSERT INTO users (id, email, name) 
       VALUES ($1, $2, $3) 
       ON CONFLICT (id) DO NOTHING`,
      [uid, email, name]
    );

    return NextResponse.json({ success: true, message: "User synced successfully" });

  } catch (error: any) {
    console.error("Sync Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}