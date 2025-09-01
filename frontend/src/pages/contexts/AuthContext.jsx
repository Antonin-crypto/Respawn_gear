import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const axiosUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    axiosUser();
  }, []);

  const logout = async () => {
    await axios.post("http://localhost:5000/api/users/logout", {
      withCredentials: true,
    });
    setUser(null);
  };

  const deleteAccount = async () => {
    if (!window.confirm("Es-tu sûr de vouloit supprimer ton compte ?")) return;

    try {
      const res = await axios.delete(
        "http://localhost:5000/api/users/profile/delete",
        {
          withCredentials: true,
        }
      );
      alert(res.data.message);
      setUser(null);
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Erreur lords de la suppression du compte.");
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, logout, deleteAccount }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
