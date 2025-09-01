import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!user) {
    console.log("Utilisateur non connecté");
    return <Navigate to="/login" replace />;
  }
  console.log("User in ProtectedRoute:", user.role);
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    console.log("Role non autorisé :", user.role);
    return <Navigate to="/home" replace />;
  }
  console.log("Accès autorisé à :", user.role);
  return children;
};

export default ProtectedRoute;
