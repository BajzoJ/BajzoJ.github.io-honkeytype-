const express = require("express");
const app = express();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(express.json());

app.get("/api", (req, res) => {
  res.json({ message: "Backend funguje" });
});

app.get("/api/support-click", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT COUNT(*) FROM test_results"
    );

    const count = result.rows[0].count;

    console.log("support clicked, tests in DB:", count);

    res.json({
      message: "Support click OK",
      testsInDB: count
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "DB error" });
  }
});


app.post("/api/test-finished", async (req, res) => {
  try {
    const { wpm, accuracy, rawWpm, chars } = req.body;

    const result = await pool.query(
      `INSERT INTO test_results (wpm, accuracy, raw_wpm, chars)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [wpm, accuracy, rawWpm, chars]
    );

    console.log("test saved:", result.rows[0]);

    res.json({ ok: true, data: result.rows[0] });
  } catch (err) {
    console.log("DB error:", err);
    res.status(500).json({ ok: false });
  }
});




app.listen(3000, "0.0.0.0", () => {
  console.log("Backend beží");
});