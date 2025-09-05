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
          <button className="mt-4 w-full border border-gray-300 rounded py-2 flex justify-center items-center space-x-2 hover:bg-gray-100 transition">
            <img src="/google-icon.png" alt="Google" className="w-5 h-5" />
            <span>{trans("signup.buttons.google_log")}</span>
          </button>
          <p className="mt-6 text-center text-gray-600">
            {trans("signup.alreadyHaveAccount")}{" "}
            <a href="/sign_up" className="text-red-500 hover:underline">
              {trans("signup.signupLink")}
            </a>
          </p>
        </div>
      </main>
      <footer className="bg-black text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Exclusive */}
            <div>
              <h3 className="text-xl font-bold mb-4">Exclusive</h3>
              <h4 className="font-semibold mb-4">Subscribe</h4>
              <p className="text-sm mb-4">Get 10% off your first order</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-transparent border border-white px-3 py-2 rounded-l flex-1 text-sm focus:outline-none"
                />
                <button className="bg-white text-black px-3 py-2 rounded-r hover:bg-gray-200 transition-colors">
                  →
                </button>
              </div>
            </div>

            {/* Support */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-start space-x-2">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>111 Bijoy Sarani, Dhaka, DH 1515, Bangladesh</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>exclusive@gmail.com</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+88015-88888-9999</span>
                </p>
              </div>
            </div>

            {/* Account */}
            <div>
              <h3 className="font-semibold mb-4">Account</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/account"
                    className="hover:text-gray-300 transition-colors"
                  >
                    My Account
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Login / Register
                  </a>
                </li>
                <li>
                  <a
                    href="/cart"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Cart
                  </a>
                </li>
                <li>
                  <a
                    href="/wishlist"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Wishlist
                  </a>
                </li>
                <li>
                  <a
                    href="/shop"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Shop
                  </a>
                </li>
              </ul>
            </div>

            {/* Quick Link */}
            <div>
              <h3 className="font-semibold mb-4">Quick Link</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="/privacy"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="/terms"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Terms Of Use
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="hover:text-gray-300 transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-gray-300 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Download App */}
            <div>
              <h3 className="font-semibold mb-4">Download App</h3>
              <p className="text-xs text-gray-400 mb-4">
                Save $3 with App New User Only
              </p>

              <div className="flex items-center space-x-2 mb-4">
                <div className="w-20 h-20 bg-white rounded flex items-center justify-center">
                  <div className="w-16 h-16 bg-black rounded grid grid-cols-8 gap-0.5 p-1">
                    {Array.from({ length: 64 }).map((_, i) => (
                      <div
                        key={i}
                        className={`${
                          Math.random() > 0.5 ? "bg-white" : "bg-black"
                        }`}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="bg-white text-black px-3 py-1 rounded text-xs flex items-center space-x-2">
                    <span>📱</span>
                    <span>Google Play</span>
                  </div>
                  <div className="bg-white text-black px-3 py-1 rounded text-xs flex items-center space-x-2">
                    <span>🍎</span>
                    <span>App Store</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-4">
                <Facebook className="w-5 h-5 hover:text-blue-400 cursor-pointer transition-colors" />
                <Twitter className="w-5 h-5 hover:text-blue-300 cursor-pointer transition-colors" />
                <Instagram className="w-5 h-5 hover:text-pink-400 cursor-pointer transition-colors" />
                <Linkedin className="w-5 h-5 hover:text-blue-500 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-4 py-4 text-center text-sm text-gray-500">
            © Copyright Rimel 2022. All right reserved
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
