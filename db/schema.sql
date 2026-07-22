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