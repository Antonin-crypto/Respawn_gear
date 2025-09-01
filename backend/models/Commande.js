const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Commande = sequelize.define("commande", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dateCommande: { type: DataTypes.DATE },
  Statut: { type: DataTypes.STRING },
});
module.exports = Commande;
