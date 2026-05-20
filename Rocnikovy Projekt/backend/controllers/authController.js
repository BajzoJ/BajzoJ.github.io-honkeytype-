const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET || "tajny_kluc";

async function register(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password)
      return res.status(400).json({ ok: false, message: "Chýba username alebo heslo" });

    const existing = await User.findByUsername(username);
    if (existing)
      return res.status(409).json({ ok: false, message: "Username už existuje" });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.createUser(username, hash);

    res.json({ ok: true, user });
  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({ ok: false, message: "Chyba servera" });
  }
}

async function login(req, res) {
  try {
    const { username, password } = req.body;

    const user = await User.findByUsername(username);
    if (!user)
      return res.status(401).json({ ok: false, message: "Nesprávne údaje" });

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(401).json({ ok: false, message: "Nesprávne údaje" });

    const token = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ ok: true, token, username: user.username });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ ok: false, message: "Chyba servera" });
  }
}

module.exports = { register, login };