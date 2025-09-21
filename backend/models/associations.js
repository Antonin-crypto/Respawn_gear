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
const CommandeProduit = require("../models/CommandeProduit.");
const Brand = require("./brand");

// User <-> Adress
User.hasMany(Adress, { foreignKey: "UserId" });
Adress.belongsTo(User, { foreignKey: "UserId" });

// User <-> Panier
User.hasOne(Panier, { foreignKey: "UserId" });
Panier.belongsTo(User, { foreignKey: "UserId" });

// User <-> Avis
User.hasMany(Avis, { foreignKey: "UserId" });
Avis.belongsTo(User, { foreignKey: "UserId" });

// Produit ↔ Categorie
Produit.belongsTo(Categorie, { as: "categorie", foreignKey: "categorieId" });
Categorie.hasMany(Produit, { as: "produits", foreignKey: "categorieId" });

// Produit <-> Avis
Produit.hasMany(Avis, { foreignKey: "produitId" });
Avis.belongsTo(Produit, { foreignKey: "produitId" });

// Produit ↔ Brand
Produit.belongsTo(Brand, { as: "brand", foreignKey: "brandId" });
Brand.hasMany(Produit, { as: "produits", foreignKey: "brandId" });

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

// Commande <-> CommadeProduit
Commande.hasMany(CommandeProduit, { foreignKey: "commandesId" });
CommandeProduit.belongsTo(Commande, { foreignKey: "commandesId" });

// Commande ↔ Produit via CommandeProduit
Commande.belongsToMany(Produit, {
  through: CommandeProduit,
  foreignKey: "commandId",
});
Produit.belongsToMany(Commande, {
  through: CommandeProduit,
  foreignKey: "produitId",
});

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
  CommandeProduit,
  Brand,
};
