const User = require("../models/userModel");

async function getProfile(req, res) {
  try {
    const { username } = req.query;
    if (!username) return res.status(400).json({ ok: false, message: "Chýba username" });

    const user = await User.findByUsername(username);
    if (!user) return res.status(404).json({ ok: false, message: "User nenájdený" });

    const tests = await User.getTestsByUserId(user.id);

    res.json({ ok: true, user, tests });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({ ok: false, message: "Chyba servera" });
  }
}

module.exports = { getProfile };