const express = require("express");
const router = express.Router();
const User = require("../models/user");

router.post("/register", async (req, res) => {
  const { name, last_name, email, password } = req.body;

  if (!name || !last_name || !email || !password) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const existingerUser = await User.findOne({ where: { email } });
    if (existingerUser) {
      return res.status(400).json({ error: "Email est déja utilisé" });
    }
    const newUser = await User.create({ name, last_name, email, password });

    const { password: pwd, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      message: "Utilisateur est crée avec succès",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur" });
  }
});

module.exports = router;
