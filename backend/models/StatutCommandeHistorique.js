const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StatutCommandeHistorique = sequelize.define("statutcommandehistorique", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  statut: { type: DataTypes.STRING, allowNull: false },
  dateStatut: { type: DataTypes.DATE },
});

module.exports = StatutCommandeHistorique;
