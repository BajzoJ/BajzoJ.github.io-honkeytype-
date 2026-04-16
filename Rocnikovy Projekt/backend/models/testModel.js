const pool = require("../db/pool");

async function insertTest(wpm, accuracy, rawWpm, chars) {
  const result = await pool.query(
    `INSERT INTO test_results (wpm, accuracy, raw_wpm, chars)
     VALUES ($1, $2, $3, $4)
     RETURNING *`,
    [wpm, accuracy, rawWpm, chars]
  );

  return result.rows[0];
}

async function countTests() {
  const result = await pool.query("SELECT COUNT(*) FROM test_results");
  return result.rows[0].count;
}

module.exports = {
  insertTest,
  countTests
};