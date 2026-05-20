const pool = require("../db/pool");

async function findByUsername(username) {
  const result = await pool.query(
    "SELECT * FROM users WHERE username = $1",
    [username]
  );
  return result.rows[0];
}

async function createUser(username, hashedPassword) {
  const result = await pool.query(
    "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username, created_at",
    [username, hashedPassword]
  );
  return result.rows[0];
}

async function findById(id) {
  const result = await pool.query(
    "SELECT id, username, created_at FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

async function getTestsByUserId(userId) {
  const result = await pool.query(
    "SELECT * FROM test_results WHERE user_id = $1 ORDER BY date DESC",
    [userId]
  );
  return result.rows;
}

module.exports = { findByUsername, createUser, findById, getTestsByUserId };