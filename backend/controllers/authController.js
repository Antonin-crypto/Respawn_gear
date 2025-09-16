const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.registerUser = async (req, res) => {
  const { name, last_name, email, password, role } = req.body;
  const phone = req.body.phone || null;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email est déjà utilisé" });
    }
    const newUser = await User.create({
      name,
      last_name,
      email,
      password,
      phone,
      role,
    });
    const { password: pwd, ...userWithoutPassword } = newUser.toJSON();

    res.status(201).json({
      message: "Utilisateur crée avec succès",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "erreur serveur" });
  }
};
