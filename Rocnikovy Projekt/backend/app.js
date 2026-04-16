const express = require("express");
const app = express();

app.use(express.json());

const testRoutes = require("./routes/testRoutes");

app.use("/api", testRoutes);

app.get("/api", (req, res) => {
  res.json({ message: "Backend funguje" });
});

app.listen(3000, "0.0.0.0", () => {
  console.log("Backend beží");
});