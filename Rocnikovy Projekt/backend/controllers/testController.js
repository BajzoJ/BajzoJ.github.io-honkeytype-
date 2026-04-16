const Test = require("../models/testModel");

async function testFinished(req, res) {
  try {
    const { wpm, accuracy, rawWpm, chars } = req.body;

    const data = await Test.insertTest(wpm, accuracy, rawWpm, chars);

    console.log("test saved:", data);

    res.json({ ok: true, data });

  } catch (err) {
    console.log("DB error:", err);
    res.status(500).json({ ok: false });
  }
}

async function supportClick(req, res) {
  try {
    const count = await Test.countTests();

    res.json({
      message: "Support click OK",
      testsInDB: parseInt(count)
    });

  } catch (err) {
    res.status(500).json({ error: "DB error" });
  }
}

module.exports = {
  testFinished,
  supportClick
};