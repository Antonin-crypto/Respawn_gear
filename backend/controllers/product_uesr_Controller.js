const { Produit, Categorie } = require("../models/associations");
const Image = require("../models/Image");

// Récupérer tous les produits avec 1 image
exports.getAllProducts = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      include: [{ model: Image, as: "images", limit: 1 }],
    });
    res.json(produits);
  } catch (error) {
    console.error(" Erreur getAllProducts :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Page d’accueil (8 produits récents)
exports.getHomePageProducts = async (req, res) => {
  try {
    const produits = await Produit.findAll({
      include: [
        { model: Image, as: "images", limit: 1 },
        { model: Categorie, as: "categorie" },
      ],
      limit: 8,
      order: [["createdAt", "DESC"]],
    });
    res.json(produits);
  } catch (error) {
    console.error(" Erreur getHomePageProducts :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Produits par catégorie via query (?categorie=...)
exports.getProductsByCategoryQuery = async (req, res) => {
  const category = req.query.categorie;
  try {
    const produits = await Produit.findAll({
      where: category ? { categorie: category } : {},
      include: [{ model: Image, as: "images" }],
    });
    res.json(produits);
  } catch (error) {
    console.error(" Erreur getProductsByCategoryQuery :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Liste des catégories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Categorie.findAll();
    res.json(categories);
  } catch (error) {
    console.error(" Erreur getCategories :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Produits d’une catégorie (slug en paramètre)
exports.getProductsBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await Categorie.findOne({ where: { slug } });
    if (!category)
      return res.status(404).json({ message: "Catégorie introuvable" });

    const produits = await Produit.findAll({
      where: { categorieId: category.id },
      include: [{ model: Image, as: "images" }],
    });

    res.json(produits);
  } catch (error) {
    console.error(" Erreur getProductsBySlug :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// Détails d’un produit
exports.getProductById = async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id, {
      include: [{ model: Image, as: "images" }],
    });
    if (!produit)
      return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
  } catch (error) {
    console.error(" Erreur getProductById :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
