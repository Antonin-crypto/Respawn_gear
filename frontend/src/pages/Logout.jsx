import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutButton() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/logout",
        {
          withCredentials: true,
        }
      );
      console.log(response.data.message);
      navigate("/login");
    } catch (err) {
      console.error("Erreur de déconnexion", err);
    }
  };
  return <button onClick={handleLogout}>Déconnexion</button>;
}

export default LogoutButton;
