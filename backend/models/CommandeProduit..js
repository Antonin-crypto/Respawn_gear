const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const CommandeProduit = sequelize.define(
  "commande_produit",
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    commandId: { type: DataTypes.INTEGER, allowNull: false },
    produitId: { type: DataTypes.INTEGER, allowNull: false },
    quantite: { type: DataTypes.INTEGER, allowNull: false },
    prix: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  },
  {
    tableName: "commande_produit",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["commandId", "produitId"],
      },
    ],
  }
);

module.exports = CommandeProduit;
