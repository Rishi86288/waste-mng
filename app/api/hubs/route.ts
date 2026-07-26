import { NextResponse } from "next/server";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      user_uid, name, email, rank, items_scanned, green_points,
      contact_number, village_panchayat, block, city, district, state, pincode, accepted_types
    } = body;

    const query = `
      INSERT INTO new_recycling_hubs 
      (user_uid, name, email, rank, items_scanned, green_points, contact_number, village_panchayat, block, city, district, state, pincode, accepted_types, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, 'Pending')
    `;
    const values = [user_uid, name, email, rank, items_scanned, green_points, contact_number, village_panchayat, block, city, district, state, pincode, accepted_types];
    
    await pool.query(query, values);

    return NextResponse.json({ success: true, message: "Hub saved to DB" });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: "Failed to save to DB" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const uid = searchParams.get('uid');
    const status = searchParams.get('status');

    // 1. अगर कम्युनिटी हब्स (Approved) फेच करने हैं 
    if (status === 'Approved') {
      const query = `SELECT * FROM new_recycling_hubs WHERE status = 'Approved' ORDER BY created_at DESC`;
      const { rows } = await pool.query(query);
      return NextResponse.json({ success: true, hubs: rows });
    }

    // 2. अगर किसी खास यूजर (Your Added Hubs) का डेटा फेच करना है
    if (uid) {
      const query = `SELECT * FROM new_recycling_hubs WHERE user_uid = $1 ORDER BY created_at DESC`;
      const { rows } = await pool.query(query, [uid]);
      return NextResponse.json({ success: true, hubs: rows });
    }

    // अगर दोनों में से कुछ भी नहीं भेजा है
    return NextResponse.json({ success: false, message: "Missing uid or status parameter" }, { status: 400 });
   
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ success: false, message: "Failed to fetch hubs" }, { status: 500 });
  }
}