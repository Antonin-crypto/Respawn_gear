const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  getHomePageProducts,
  getProductsByCategoryQuery,
  getCategories,
  getProductsBySlug,
  getProductById,
  BrandProduct,
} = require("../controllers/product_user_Controller");

// Routes publiques
// Récupérer toutes les marques
router.get("/brands", BrandProduct);
// Récuperer tout les produit
router.get("/home", getAllProducts);
// Récupere 8 produit pour la page home
router.get("/home_page", getHomePageProducts);
// Récuperer les produit par query les categorie
router.get("/category", getProductsByCategoryQuery);
// Récuper les produit par categorie
router.get("/categories", getCategories);
// Récupere les produit par categorie par slug (en gros le mot en url)
router.get("/category/:slug", getProductsBySlug);
// Récupere les produit par Id
router.get("/:id", getProductById);

module.exports = router;
