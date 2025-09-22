import React, { useEffect, useState } from "react";
import { trans, setLanguage } from "../../translations/index";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../pages/composent/images/Logo de Respawn Gear.png";
import DropdownMenu from "../composent/DropdownMenu/DropdownMenu";
import SearchBar from "./SearchBar/SearchBar";
import axios from "axios";

function HeaderPage() {
  const [lang, setLang] = useState("fr");
  const navigate = useNavigate();
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produits/home_page")
      .then((res) => setProduits(res.data))
      .catch((err) =>
        console.error("Erreur lors du chargement des produits :", err)
      );
  }, []);

  const handleClick = () => navigate("/panier");
  const handleClickwishlist = () => navigate("/wishlist");

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setLanguage(newLang);
  };

  return (
    <div className="font-sans text-gray-800">
      {/* Top Banner */}
      <div className="bg-black text-white py-2 text-sm flex items-center justify-center relative">
        <span className="ml-2 font-bold underline">
          {trans("header.top_title")}
        </span>
        <div className="absolute right-2">
          <select
            value={lang}
            onChange={handleLangChange}
            className="bg-gray-800 text-white border border-gray-700 rounded px-2 py-1"
          >
            <option value="fr">🇫🇷 Français</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>
      </div>

      {/* Navbar */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="text-2xl font-bold">
            <img
              src={logo}
              alt="Shopping and mobile"
              className="h-12 w-auto object-contain"
            />
          </div>

          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="/home">{trans("header.title")}</a>
            <a href="/contact">{trans("header.title_2")}</a>
            <a href="/propos">{trans("header.title_3")}</a>
            <a href="/sign_up">{trans("header.title_4")}</a>
          </nav>

          {/* SearchBar + Icons */}
          <div className="flex items-center space-x-4">
            <SearchBar
              placeholder="Rechercher un produit..."
              produits={produits}
            />

            {/* Icons */}
            <button onClick={handleClickwishlist}>
              <Heart className="w-6 h-6" />
            </button>
            <button onClick={handleClick}>
              <ShoppingCart className="w-6 h-6" />
            </button>
            <DropdownMenu className="w-5 h-5"></DropdownMenu>
          </div>
        </div>
      </header>
    </div>
  );
}

export default HeaderPage;
