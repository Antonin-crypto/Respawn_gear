const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Panier = sequelize.define("panier", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  datecreation: { type: DataTypes.DATE },
});

module.exports = Panier;
