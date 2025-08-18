const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Produit = require("./produit");

const Image = sequelize.define(
  "image",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    produitId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Produit,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "images",
    timestamps: true,
  }
);

Produit.hasMany(Image, { foreignKey: "produitId", as: "images" });
Image.belongsTo(Produit, { foreignKey: "produitId", as: "produits" });

module.exports = Image;
