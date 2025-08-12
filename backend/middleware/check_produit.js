const Produit = require("../models/produit");

const checkOwnership = async (req, res, next) => {
  try {
    const produit = await Produit.findByPk(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    if (produit.userId !== req.user.id) {
      return res.status(403).json({ message: "Accès refusé" });
    }

    req.produit = produit;
    next();
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = checkOwnership;
