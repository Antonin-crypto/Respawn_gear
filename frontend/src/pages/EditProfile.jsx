import React, { useEffect, useState } from "react";
import axios from "axios";

const EditProfile = () => {
  const [user, setUser] = useState({
    name: "",
    last_name: "",
    email: "",
    phone: "",
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/users/profile", { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setMessage("Erreur de chargement du profil"));
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5000/api/users/profile", user, {
        withCredentials: true,
      })
      .then((res) => setMessage("Profil mis à jour"))
      .catch(() => setMessage("Erreur lors de la mise à jour"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={user.name}
        onChange={handleChange}
        placeholder="Nom"
      />
      <input
        name="last_name"
        value={user.last_name}
        onChange={handleChange}
        placeholder="Prénom"
      />
      <input
        name="email"
        value={user.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <input
        name="phone"
        value={user.phone}
        onChange={handleChange}
        placeholder="Téléphone"
      />
      <button type="submit">Mettre à jour</button>
      <p>{message}</p>
    </form>
  );
};

export default EditProfile;
