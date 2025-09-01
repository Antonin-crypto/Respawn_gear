const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Paiement = sequelize.define("paiement", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  modePaiement: { type: DataTypes.STRING },
  statutPaiement: { type: DataTypes.STRING },
  datePaiement: { type: DataTypes.DATE },
  montant: { type: DataTypes.FLOAT },
});

module.exports = Paiement;
