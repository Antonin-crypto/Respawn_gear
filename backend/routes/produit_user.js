const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getHomePageProducts,
  getProductsByCategoryQuery,
  getCategories,
  getProductsBySlug,
  getProductById,
} = require("../controllers/product_uesr_Controller");

// Routes publiques
router.get("/home", getAllProducts);
router.get("/home_page", getHomePageProducts);
router.get("/category", getProductsByCategoryQuery);
router.get("/categories", getCategories);
router.get("/category/:slug", getProductsBySlug);
router.get("/:id", getProductById);

module.exports = router;
