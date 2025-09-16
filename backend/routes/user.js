const express = require("express");
const router = express.Router();
const authenticateToken = require("../middleware/authenticateToken");
const {
  loginValidationRules,
  updateValidationRules,
} = require("../middleware/validator");

const {
  loginUser,
  logoutUser,
  getProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/usesrController");

// Connexion
router.post("/login", loginValidationRules, loginUser);

// Déconnexion
router.post("/logout", logoutUser);

// Profil
router.get("/profile", authenticateToken, getProfile);

// Modifier profil
router.put(
  "/profile/modification",
  authenticateToken,
  updateValidationRules,
  updateProfile
);

// Supprimer profil
router.delete("/profile/delete", authenticateToken, deleteProfile);

module.exports = router;
