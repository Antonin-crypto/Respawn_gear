const Produit = require("./produit");
const Categorie = require("./categorie");
const Image = require("./Image");
const User = require("./user");
const Avis = require("./Avis");
const Adress = require("./adress");
const Commande = require("./Commande");
const ArticlePanier = require("./ArticlePanier");
const StatutCommandeHistorique = require("./StatutCommandeHistorique");
const Wishlist = require("./Wishlist");
const Paiement = require("./Paiement");
const Panier = require("./Panier");

// User <-> Adress
User.hasMany(Adress, { foreignKey: "UserId" });
Adress.belongsTo(User, { foreignKey: "UserId" });

// User <-> Panier
User.hasMany(Panier, { foreignKey: "UserId" });
Panier.belongsTo(User, { foreignKey: "UserId" });

// User <-> Avis
User.hasMany(Avis, { foreignKey: "UserId" });
Avis.belongsTo(User, { foreignKey: "UserId" });

// Produit ↔ Categorie
Produit.belongsTo(Categorie, { foreignKey: "categorieId" });
Categorie.hasMany(Produit, { foreignKey: "categorieId" });

// Produit <-> Avis
Produit.hasMany(Avis, { foreignKey: "produitId" });
Avis.belongsTo(Produit, { foreignKey: "produitId" });

// Panier <-> Produit
Panier.belongsToMany(Produit, {
  through: ArticlePanier,
  foreignKey: "panierId",
});
Produit.belongsToMany(Panier, {
  through: ArticlePanier,
  foreignKey: "produitId",
});

// Commande <-> Paiement
Commande.hasOne(Paiement, { foreignKey: "commandesId" });
Paiement.belongsTo(Commande, { foreignKey: "commandesId" });

// Commande <-> StatutCommandeHistorique
Commande.hasMany(StatutCommandeHistorique, { foreignKey: "commandesId" });
StatutCommandeHistorique.belongsTo(Commande, { foreignKey: "commandesId" });

// User <-> Wishlist <-> Produit
User.belongsToMany(Produit, { through: Wishlist, foreignKey: "UserId" });
Produit.belongsToMany(User, { through: Wishlist, foreignKey: "produitId" });

module.exports = {
  Produit,
  Categorie,
  Image,
  Commande,
  StatutCommandeHistorique,
  Paiement,
  Panier,
  Avis,
  ArticlePanier,
  Adress,
  Wishlist,
  User,
};
