import { AuthContext } from "./contexts/AuthContext";
import React, { useContext } from "react";
const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);

  if (loading) return <p>Chargement...</p>;

  if (!user) return <p>connextion toi pour voir cet page.</p>;

  return (
    <div>
      <h1>Bienvenue sur le dashboard!</h1>
      <nav>
        <button style={{ color: "red" }} onClick={logout}>
          déconnexion du compte
        </button>
      </nav>
    </div>
  );
};

export default Dashboard;
