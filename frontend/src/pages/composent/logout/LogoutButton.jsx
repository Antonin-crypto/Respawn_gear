import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const useLogout = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/home");
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    }
  };

  return logout;
};
