const express = require("express");
const router = express.Router();
const { createCommande } = require("../controllers/ordreController");

// Créer une commande
router.post("/", createCommande);

module.exports = router;
