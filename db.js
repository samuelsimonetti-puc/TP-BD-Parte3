require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT) || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "ProjetoBD",
});

async function query(text, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

pool.on("connect", () => {
  console.log("Conectado ao PostgreSQL");
});

pool.on("error", (err) => {
  console.error("Erro no pool do PostgreSQL:", err);
});

module.exports = { query, pool };
