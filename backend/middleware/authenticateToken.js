const jwt = require("jsonwebtoken");

// Middleware d'authentification avec JWT
function authenticateToken(req, res, next) {
  // Récupération du token (cookie ou header Authorization)
  const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Token manquant" });

  // Vérification du token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Token invalide" });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
