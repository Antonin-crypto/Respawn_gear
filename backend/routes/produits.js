const express = require("express");
const router = express.Router();
const Produit = require("../models/produit");
const authenticateToken = require("../middleware/authenticateToken");
const checkOwnership = require("../middleware/check_produit");

router.get("/", async (req, res) => {
  try {
    const produits = await Produit.findAll();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit)
      return res.status(404).json({ message: "Produit non trouvée" });
    res.json(produit);
  } catch (error) {
    res.status(500).json({ message: "erreur serveur" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { name, description, price, categorie } = req.body;
    const newproduit = await Produit.create({
      name,
      description,
      price,
      categorie,
      userId: req.user.id,
    });
    res.status(201).json("newProduit");
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

router.put("/:id", authenticateToken, checkOwnership, async (req, res) => {
  try {
    const { name, description, price, categorie } = req.body;
    await req.produit.update({ name, description, price, categorie });
    res.json(req.produit);
  } catch (error) {
    res.status(500).json({ message: "erreur de serveur" });
  }
});

router.delete("/:id", authenticateToken, checkOwnership, async (req, res) => {
  try {
    await req.produit.destroy();
    res.json({ message: "Produit supprimer" });
  } catch (error) {
    res.status(500).json({ message: "eurreur de serveur" });
  }
});

module.exports = router;
