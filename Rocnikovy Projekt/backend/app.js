const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const testRoutes = require("./routes/testRoutes");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
app.use("/api", profileRoutes);
app.use("/api", testRoutes);
app.use("/api/auth", authRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Backend funguje" });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Backend beží");
});