const express = require("express");
const router = express.Router();
const multer = require("multer");
const authenticateToken = require("../middleware/authenticateToken");
const checkOwnership = require("../middleware/check_produit");
const {
  createProduit,
  updateProduit,
  deleteProduit,
} = require("../controllers/product_admin_controller");

// Multer config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Créer un produit
router.post("/", authenticateToken, upload.array("images", 5), createProduit);

// Mettre à jour un produit
router.put(
  "/:id",
  authenticateToken,
  checkOwnership,
  upload.array("images", 5),
  updateProduit
);

// Supprimer un produit
router.delete("/:id", authenticateToken, checkOwnership, deleteProduit);

module.exports = router;
