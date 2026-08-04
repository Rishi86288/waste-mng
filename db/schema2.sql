CREATE TYPE hub_status AS ENUM ('Pending', 'Approved', 'Declined', 'Under Process');
CREATE TABLE users (
    id VARCHAR(128) PRIMARY KEY,             -- Firebase UID यहाँ 'id' के रूप में सेव होगा
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    green_points DECIMAL(10, 2) DEFAULT 0.00, -- 0.5 पॉइंट्स के सपोर्ट के लिए DECIMAL
    scans_completed INT DEFAULT 0,
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE scan_history (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(128) REFERENCES users(id) ON DELETE CASCADE,
    waste_category VARCHAR(255) NOT NULL,    -- AI से मिला category (उदा: e-waste)
    confidence_score DECIMAL(5, 4),          -- AI का कॉन्फिडेंस (उदा: 0.8932)
    points_awarded DECIMAL(10, 2),           -- कितने पॉइंट मिले (0.5, 1, 2)
    scanned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE new_recycling_hubs (
    id SERIAL PRIMARY KEY,
    user_uid VARCHAR(128) REFERENCES users(id) ON DELETE CASCADE,
    
    -- यूज़र की वो जानकारी जो फॉर्म सबमिट करते वक्त सेव हो रही है
    name VARCHAR(255),
    email VARCHAR(255),
    rank VARCHAR(100),
    items_scanned INT,
    green_points DECIMAL(10, 2),
    
    -- हब की जानकारी
    contact_number VARCHAR(50),
    village_panchayat VARCHAR(255),
    block VARCHAR(255),
    city VARCHAR(255),
    district VARCHAR(255),
    state VARCHAR(255),
    pincode VARCHAR(20),
    accepted_types TEXT,
    
    status hub_status DEFAULT 'Pending',     -- ENUM का इस्तेमाल
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE recycling_points (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    accepted_types TEXT NOT NULL
);

-- अगर प्रोडक्शन के फॉलबैक हब्स (जैसे AMC E-Waste, CIPET Campus) डेटाबेस में डालने हों:
INSERT INTO recycling_points (name, address, accepted_types) VALUES 
('AMC E-Waste Collection Center', 'Navrangpura Ward, Zone 3', 'E-Waste, Hazardous'),
('Smart Manufacturing Eco-Bin', 'CIPET Campus, Phase IV', 'Recyclable, Plastics'),
('Vastrapur Compost Plant', 'Vastrapur Lake Road', 'Compostable, Organic');
