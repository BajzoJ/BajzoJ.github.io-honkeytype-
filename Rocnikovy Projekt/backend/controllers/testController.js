const Test = require("../models/testModel");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "tajny_kluc";

async function testFinished(req, res) {
  try {
    const { wpm, accuracy, rawWpm, chars } = req.body;

    // Zistí user_id z tokenu ak je prihlásený
    let userId = null;
    const authHeader = req.headers["authorization"];
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        userId = decoded.id;
      } catch (e) {}
    }

    const data = await Test.insertTest(wpm, accuracy, rawWpm, chars, userId);
    res.json({ ok: true, data });

  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ ok: false });
  }
}

async function supportClick(req, res) {
  try {
    const count = await Test.countTests();
    res.json({ message: "Support click OK", testsInDB: parseInt(count) });
  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
}

module.exports = { testFinished, supportClick };