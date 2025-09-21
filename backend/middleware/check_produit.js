const Produit = require("../models/produit");

// checkOwnership est pour vérifier si l'utilisateur est admin et propriétaire d'une ressource
const checkOwnership = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({
        message: "Seuls les administrateurs peuvent effectuer cette action",
      });
    }

    const produit = await Produit.findByPk(req.params.id);
    if (!produit) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }

    req.produit = produit;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Erreur serveur" });
  }
};

module.exports = checkOwnership;
