const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Avis = sequelize.define("avis", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  note: { type: DataTypes.INTEGER },
  commentaire: { type: DataTypes.TEXT },
  dateAvis: { type: DataTypes.DATE },
});

module.exports = Avis;
