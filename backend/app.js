require("dotenv").config();
const express = require("express");
const app = express();

// Routes
const authRoutes = require("./routes/auth");
const loginRoutes = require("./routes/user");
const produitAdminRoutes = require("../backend/routes/produit_admin");
const produitUserRoutes = require("../backend/routes/produit_user");
const orderRoutes = require("../backend/routes/order");
const paiementRoutes = require("../backend/routes/paiement");

// Middlewares
const checkRole = require("../backend/middleware/checkRole");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authenticateToken = require("../backend/middleware/authenticateToken");

// Initialisation des catégories et Marques dans la DB
require("../backend/models/initCategories/initCategories");

// Middlewares globaux
app.use(express.json());

app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes publiques
app.use("/commandes", orderRoutes);
app.use("/paiements", paiementRoutes);
app.use("/api", authRoutes);
app.use("/api/users", loginRoutes);

// Routes produits
app.use("/api/produits", produitUserRoutes);

// Routes admin produits protégées
app.use(
  "/api/admin/produits",
  authenticateToken,
  checkRole(["admin"]),
  produitAdminRoutes
);

module.exports = app;
