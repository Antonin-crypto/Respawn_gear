const express = require("express");
const router = express.Router();
const User = require("../models/user");

// express_validator
const { body, validationResult } = require("express-validator");
const { registerValidationRules } = require("../middleware/validator");

// S'incrire
router.post("/register", registerValidationRules, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ erros: errors.array() });
  }
  const { name, last_name, email, password, role } = req.body;
  const phone = req.body.phone || null;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email est déja utilisé." });
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
      message: "utilisateur est crée avec succés",
      user: userWithoutPassword,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erreur serveur." });
  }
});

module.exports = router;
