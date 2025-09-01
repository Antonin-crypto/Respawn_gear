const express = require("express");
const router = express.Router();
const { Produit, Categorie } = require("../models/associations");
const Image = require("../models/Image");

//  Routes accessibles aux utilisateurs (lecture seulement)
router.get("/home", async (req, res) => {
  try {
    const produits = await Produit.findAll({
      include: [{ model: Image, as: "images", limit: 1 }],
    });
    res.json(produits);
  } catch (error) {
    console.error("❌ Erreur GET /home :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/home_page", async (req, res) => {
  try {
    const produits = await Produit.findAll({
      include: [{ model: Image, as: "images", limit: 1 }],
      limit: 8,
      order: [["createdAt", "DESC"]],
    });
    res.json(produits);
  } catch (error) {
    console.error("erreur lords de la récupération du produit", error);
    res.status(500).json({ message: "erreur serveur" });
  }
});

router.get("/category", async (req, res) => {
  const category = req.query.categorie;
  console.log("Received category:", category);
  try {
    console.log(category);
    const produit = await Produit.findAll({
      where: category ? { categorie: category } : {},
      include: [{ model: Image, as: "images" }],
    });
    res.json(produit);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur serveur route category" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id, {
      include: [{ model: Image, as: "images" }],
    });
    if (!produit)
      return res.status(404).json({ message: "Produit non trouvé" });
    res.json(produit);
  } catch (error) {
    console.error("❌ Erreur GET /:id :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
