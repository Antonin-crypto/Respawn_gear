const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const ArticlePanier = sequelize.define("articlepanier", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quantite: { type: DataTypes.INTEGER },
});

module.exports = ArticlePanier;
