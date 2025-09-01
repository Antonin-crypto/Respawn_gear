const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Wishlist = sequelize.define("wishlist", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
});

module.exports = Wishlist;
