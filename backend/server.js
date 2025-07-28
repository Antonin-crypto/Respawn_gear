const app = require("./app");
const sequelize = require("./config/database");
require("dotenv").config();

const PORT = process.env.Port || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connexion à la base de Données");

    await sequelize.sync({ alter: true });

    app.listen(PORT, () => {
      console.log("Serveur est lancé sur le port http://localhost:${PORT}");
    });
  } catch (error) {
    console.error("Erreur de la connexion à la base de données :", error);
  }
})();
