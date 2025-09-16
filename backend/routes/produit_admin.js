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

// CREATE produit
router.post("/", authenticateToken, upload.array("images", 5), createProduit);

// UPDATE produit
router.put(
  "/:id",
  authenticateToken,
  checkOwnership,
  upload.array("images", 5),
  updateProduit
);

// DELETE produit
router.delete("/:id", authenticateToken, checkOwnership, deleteProduit);

module.exports = router;
