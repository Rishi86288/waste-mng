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

    // ON CONFLICT DO UPDATE: अगर यूजर नया है तो बनाएगा, और पुराना है तो उसका नाम और last_login अपडेट कर देगा
    await pool.query(
      `INSERT INTO users (id, email, name, last_login) 
       VALUES ($1, $2, $3, CURRENT_TIMESTAMP) 
       ON CONFLICT (id) DO UPDATE 
       SET name = EXCLUDED.name, last_login = CURRENT_TIMESTAMP`,
      [uid, email, name]
    );

    return NextResponse.json({ success: true, message: "User synced and login time updated" });

  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error("Sync Error:", errorMessage);
    return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
  }
}