import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

const Profile = () => {
  const { user, deleteAccount } = useContext(AuthContext);

  if (!user) return <p>Chargement du Profile</p>;

  return (
    <div>
      <h2>Profil</h2>
      <p>Nom: {user.last_name}</p>
      <p>Prémon: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <button onClick={deleteAccount} style={{ color: "red" }}>
        Supprimer mon compte
      </button>
    </div>
  );
};

export default Profile;
