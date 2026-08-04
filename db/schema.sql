-- यूजर्स टेबल
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    green_points INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- स्कैन हिस्ट्री टेबल
CREATE TABLE IF NOT EXISTS scan_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id TEXT,
    waste_category TEXT NOT NULL,
    confidence_score REAL,
    points_awarded INTEGER,
    scanned_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- रीसाइक्लिंग सेंटर्स टेबल
CREATE TABLE IF NOT EXISTS recycling_points (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    accepted_types TEXT
);


-- 1. पहले ENUM टाइप बनाओ
CREATE TYPE hub_status AS ENUM ('Pending', 'Approved', 'Declined', 'Under Process');

-- 2. फिर नया टेबल बनाओ
CREATE TABLE new_recycling_hubs (
    id SERIAL PRIMARY KEY,
    user_uid VARCHAR(255) NOT NULL,
    name VARCHAR(255),
    email VARCHAR(255),
    rank VARCHAR(50),
    items_scanned INTEGER,
    green_points NUMERIC,
    contact_number VARCHAR(20),
    village_panchayat VARCHAR(255),
    block VARCHAR(255),
    city VARCHAR(255),
    district VARCHAR(255),
    state VARCHAR(255),
    pincode VARCHAR(20),
    accepted_types TEXT,
    status hub_status DEFAULT 'Pending', -- यहाँ VARCHAR की जगह ENUM का यूज़ हुआ है
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);