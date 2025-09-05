import React from "react";
import { trans, setLanguage } from "../../translations/index";
import { useState } from "react";
import { ShoppingCart, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../../pages/composent/images/Logo de Respawn Gear.png";
import DropdownMenu from "../composent/DropdownMenu/DropdownMenu";
import CategoryMenu from "../composent/DropdownMenu/CategoryMenu";

function HeaderPage() {
  const [lang, setLang] = useState("fr");
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/panier");
  };

  const handleClickwishlist = () => {
    navigate("/wishlist");
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setLanguage(newLang);
  };
  return (
    <div className="font-sans text-gray-800">
      {/* 🔝 Top Banner */}
      <div className="bg-black text-white py-2 text-sm flex items-center justify-center relative">
        Summer Sale for All Swim Suits And Free Express Delivery – OFF 50%!
        <span className="ml-2 font-bold underline">Shop Now</span>
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
      {/* 🔝 Navbar */}
      <header className="border-b">
        <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          {/* Logo */}
          <div className="text-2xl font-bold">
            <img
              src={logo}
              alt="Shopping and mobile"
              className="h-12 w-auto object-contain"
            />
          </div>

          {/* Menu */}
          <nav className="hidden md:flex space-x-6 text-gray-700 font-medium">
            <a href="/home">{trans("header.title")}</a>
            <a href="/contact">{trans("header.title_2")}</a>
            <a href="/propos">{trans("header.title_3")}</a>
            <a href="/sign_up">{trans("header.title_4")}</a>
          </nav>

          {/* SearchBar + Icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <div className="relative w-64">
              <input
                type="search"
                placeholder={trans("header.barre_de_recherche")}
                className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>

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
