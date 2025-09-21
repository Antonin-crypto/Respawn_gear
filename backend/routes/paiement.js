const express = require("express");
const router = express.Router();
const paiementController = require("../controllers/paiementController");

// Route pour payer une commande
router.post("/:commandeId/pay", paiementController.payCommande);

module.exports = router;
