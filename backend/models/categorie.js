const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Categorie = sequelize.define(
  "categorie",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    name_en: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug: { type: DataTypes.STRING, allowNull: false, unique: true },
    slug_en: { type: DataTypes.STRING, allowNull: false, unique: true },
  },
  { tableName: "categorie", timestamps: false }
);

module.exports = Categorie;
