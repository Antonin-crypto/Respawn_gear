const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Adress = sequelize.define("adress", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rue: { type: DataTypes.STRING, allowNull: false },
  ville: { type: DataTypes.STRING, allowNull: false },
  codePostal: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 15],
    },
  },
  pays: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Adress;
