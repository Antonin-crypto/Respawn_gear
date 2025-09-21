const { body } = require("express-validator");

// Règles de validation pour l'inscription d'un utilisateur
const registerValidationRules = [
  body("name").trim().notEmpty().withMessage("Le premon est requis"),
  body("last_name").trim().notEmpty().withMessage("le nom est requis"),
  body("email").trim().isEmail().withMessage("Email invalide"),
  body("phone")
    .optional({ checkFalsy: true })
    .trim()
    .notEmpty()
    .withMessage("votre numero de téléphone"),
  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Mot de passe trop court(min 6)"),
];

// Règles de validation pour la connexion
const loginValidationRules = [
  body("email").trim().isEmail().withMessage("Email invalide"),
  body("password").notEmpty().withMessage("Mot de passe requis"),
];

// Règles de validation pour la mise à jour du profil
const updateValidationRules = [
  body("name").optional().trim().notEmpty().withMessage("Nom requis"),
  body("last_name").optional().trim().notEmpty().withMessage("Prémon requis"),
  body("email").optional().trim().isEmail().withMessage("email invalide"),
  body("phone")
    .optional()
    .trim()
    .isMobilePhone()
    .withMessage("Téléphone invalide"),
];

module.exports = {
  registerValidationRules,
  loginValidationRules,
  updateValidationRules,
};
