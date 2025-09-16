const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validationResult } = require("express-validator");

exports.loginUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Email incorrect." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "Lax",
        maxAge: 3600000,
      })
      .json({ message: "Connexion réussie" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.logoutUser = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "Lax",
    secure: process.env.NODE_ENV === "production",
  });
  res.status(200).json({ message: "Déconnexion réussie" });
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.updateProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { name, last_name, email, phone } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user)
      return res.status(404).json({ error: "Utilisateur non trouvé" });

    if (name) user.name = name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (phone) user.phone = phone;

    await user.save();

    const { password, ...userWithoutPassword } = user.toJSON();
    res.json({ message: "Profil mis à jour", user: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ error: "Utilisateur non trouvé" });

    await user.destroy();
    res.clearCookie("token");
    res.json({ message: "Compte supprimé avec succès" });
  } catch (err) {
    res.status(500).json({ error: "Erreur serveur" });
  }
};
