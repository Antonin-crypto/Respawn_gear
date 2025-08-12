const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Produit = sequelize.define(
  "produit",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categorie: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "produits",
    timestamps: true,
  }
);

module.exports = Produit;
