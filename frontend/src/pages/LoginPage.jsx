import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { trans, setLanguage } from "../translations";
import image from "../pages/composent/images/image.png";
import logo from "../pages/composent/images/Logo de Respawn Gear.png";
import { AuthContext } from "./contexts/AuthContext";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";
import HeaderPage from "./composent/Header_page";
import Footer from "./composent/Footer";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:5000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      const userRes = await axios.get(
        "http://localhost:5000/api/users/profile",
        { withCredentials: true }
      );
      setUser(userRes.data);

      navigate("/home");
    } catch (err) {
      console.error("Erreur de connexion:", err);
      setError("Email ou mot de passe incorrect.");
    }
  };

  return (
    <div>
      {/* Texte à gauche */}
      <HeaderPage></HeaderPage>

      <main className="flex flex-1 bg-gray-50">
        {/* Left image section */}
        <div className="flex-1 flex items-center h-[500px] justify-center p-10">
          <img
            src={image}
            alt="Shopping and mobile"
            className="h-full object-contain"
          />
        </div>

        <div className="w-1/3 bg-white p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold mb-6">
            {trans("signup.title_2")}
          </h2>
          <p className="mb-4">{trans("signup.subtitle")}</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder={trans("signup.form.email")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              placeholder={trans("signup.form.password")}
              className="w-full border border-gray-300 rounded px-4 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <button
              className="w-full bg-red-500 text-white rounded py-2 hover:bg-red-600 transition"
              type="submit"
            >
              {trans("signup.buttons.incrire")}
            </button>
          </form>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <p className="mt-6 text-center text-gray-600">
            {trans("signup.alreadyHaveAccount")}{" "}
            <a href="/sign_up" className="text-red-500 hover:underline">
              {trans("signup.signupLink")}
            </a>
          </p>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default LoginPage;
