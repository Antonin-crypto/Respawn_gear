const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Categorie = require("./categorie");

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
    name_en: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    description_en: {
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
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    brandId: {
      type: DataTypes.INTEGER,
      references: { model: "brands", key: "id" },
    },
    categorieId: {
      type: DataTypes.INTEGER,
      references: { model: "categorie", key: "id" },
    },
  },
  {
    tableName: "produits",
    timestamps: true,
  }
);

module.exports = Produit;
