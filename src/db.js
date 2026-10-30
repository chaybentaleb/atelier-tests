const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DB_USER || 'user_test',
  host: process.env.DB_HOST || 'localhost',
  database: process.env.DB_NAME || 'db_test',
  password: process.env.DB_PASSWORD || 'password_test',
  port: process.env.DB_PORT || 5432,
});

async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS produits (
      id SERIAL PRIMARY KEY,
      nom VARCHAR(100) NOT NULL,
      prix DECIMAL(10, 2) NOT NULL
    );
  `);
}

module.exports = { pool, initDb };