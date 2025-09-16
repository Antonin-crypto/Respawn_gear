const express = require("express");
const router = express.Router();
const User = require("../models/user");

// express_validator
const { body, validationResult } = require("express-validator");
const { registerValidationRules } = require("../middleware/validator");
const { registerUser } = require("../controllers/authController");

// S'incrire
router.post(
  "/register",
  registerValidationRules,
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  registerUser
);

module.exports = router;
