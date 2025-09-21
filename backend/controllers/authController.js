const User = require("../models/user");
const bcrypt = require("bcrypt");

// Contrôleur pour enregistrer un nouvel utilisateur
exports.registerUser = async (req, res) => {
  // Récupération des données envoyées par le client
  const { name, last_name, email, password, role } = req.body;
  const phone = req.body.phone || null; // valeur optinal
  console.log(req.body);
  try {
    // Vérifier si l'email existe déjà dans la base
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email est déjà utilisé" });
    }

    // Créer un nouvel utilisateur dans la base
    const newUser = await User.create({
      name,
      last_name,
      email,
      password,
      phone,
      role,
    });
    // Supprimer le mot de passe de la réponse pour la sécurité
    const { password: pwd, ...userWithoutPassword } = newUser.toJSON();

    // Retourner un message de succès + infos utilisateur
    res.status(201).json({
      message: "Utilisateur crée avec succès",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "erreur serveur" });
  }
};
