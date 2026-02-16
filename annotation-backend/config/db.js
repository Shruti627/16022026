const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Test connection
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ PostgreSQL connection failed:", err.message);
  } else {
    console.log("✅ PostgreSQL connected successfully!");
    release();
  }
});

module.exports = pool;


// CREATE TABLE text_annotations (
//     id SERIAL PRIMARY KEY,
//     z_coordinate FLOAT NOT NULL,
//     head_x FLOAT NOT NULL,
//     head_y FLOAT NOT NULL,
//     tail_x FLOAT NOT NULL,
//     tail_y FLOAT NOT NULL,
//     comment TEXT NOT NULL,
//     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     edited BOOLEAN DEFAULT FALSE,
//     edited_at TIMESTAMP
// );