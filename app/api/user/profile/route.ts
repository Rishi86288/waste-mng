import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get("uid");

    if (!uid) {
      return NextResponse.json({ success: false, message: "Missing UID" }, { status: 400 });
    }

    // यूज़र का डेटा लाना
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [uid]);

    if (userResult.rows.length === 0) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    // रैंकिंग कैलकुलेट करना (जिसके पॉइंट्स सबसे ज्यादा, वो रैंक 1)
    const rankResult = await pool.query(
      `SELECT rank FROM (
         SELECT id, RANK() OVER (ORDER BY green_points DESC) as rank 
         FROM users
       ) ranked_users WHERE id = $1`,
      [uid]
    );

    const userRank = rankResult.rows.length > 0 ? rankResult.rows[0].rank : "Unranked";

    return NextResponse.json({ 
      success: true, 
      profile: userResult.rows[0],
      rank: userRank
    });

  } catch (error: any) {
    console.error("Profile Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}