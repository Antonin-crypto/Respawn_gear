require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

app.use(express.json());

app.use("/api", authRoutes);

app.use("/", (req, res) => {
  res.send("bienvenue");
});

module.exports = app;
