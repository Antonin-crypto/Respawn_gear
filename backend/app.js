require("dotenv").config();
const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");
const loginRoutes = require("./routes/user");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const checkRole = require("../backend/middleware/checkRole");
const authenticateToken = require("../backend/middleware/authenticateToken");
const produitAdminRoutes = require("../backend/routes/produit_admin");
const produitUserRoutes = require("../backend/routes/produit_user");
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/api", authRoutes);
app.use("/api/users", loginRoutes);

app.use("/api/produits", produitUserRoutes);
app.use(
  "/api/admin/produits",
  authenticateToken,
  checkRole(["admin"]),
  produitAdminRoutes
);

app.use("/", (req, res) => {
  res.send("bienvenue");
});

module.exports = app;
