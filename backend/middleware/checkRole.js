module.exports = function checkRole(roles) {
  return (req, res, next) => {
    console.log("Utilisateur authentifié :", req.user);
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "accès refusé" });
    }
    next();
  };
};
