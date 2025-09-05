import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Package,
  XCircle,
  Star,
  LogOut,
  ChevronDown,
  Settings,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { useLogout } from "../logout/LogoutButton";
import { trans } from "../../../translations";

export default function DropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [_, setLang] = useState(0);
  const { user } = useAuth();
  const navigate = useNavigate();
  const logout = useLogout();

  const handleClick = () => {
    logout();
  };

  const handleClickprofil = () => {
    navigate("/profile");
  };

  const handleClickpanier = () => {
    navigate("/panier");
  };

  const handleClickcancellations = () => {
    navigate("/cancellations");
  };

  const handleClickrevieuw = () => {
    navigate("/revieuw");
  };

  useEffect(() => {
    const handleLangUpdate = () => {
      setLang((prev) => prev + 1);
    };
    window.addEventListener("languagechange", handleLangUpdate);
    return () => {
      window.removeEventListener("languagechange", handleLangUpdate);
    };
  }, []);
  const menuItems = [
    {
      icon: <User size={18} />,
      label: trans("dropdownmenu.icon_user"),
      action: handleClickprofil,
    },
    {
      icon: <Package size={18} />,
      label: trans("dropdownmenu.icon_cart"),
      action: handleClickpanier,
    },
    {
      icon: <XCircle size={18} />,
      label: trans("dropdownmenu.icon_cancellation"),
      action: handleClickcancellations,
    },
    {
      icon: <Star size={18} />,
      label: trans("dropdownmenu.icon_reviews"),
      action: handleClickrevieuw,
    },
    {
      icon: <LogOut size={18} />,
      label: trans("dropdownmenu.icon_logout"),
      action: () => handleClick(),
    },
  ];
  if (user?.role === "admin") {
    menuItems.unshift({
      icon: <Settings size={18} />,
      label: trans("dropdownmenu.icon_admin"),
      action: () => navigate("/produit"),
    });
  }
  return (
    <div className="relative inline-block text-left">
      {/* Bouton avec avatar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 transition-all duration-200 shadow-sm border border-gray-200"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <User size={18} className="text-white" />
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {/* Menu déroulant */}
      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-xl shadow-xl z-50 overflow-hidden">
            {/* En-tête du menu */}
            <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">
                    {trans("header.compte")}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user ? user.name : "Chargement..."}
                  </p>
                </div>
              </div>
            </div>
            {/* Liste des options */}
            <div className="py-2">
              {menuItems.map((item, index) => (
                <button
                  key={index}
                  onClick={() => {
                    item.action();
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50/80 transition-colors duration-150 group"
                >
                  <div className="text-gray-500 group-hover:text-purple-500 transition-colors duration-150">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 group-hover:text-gray-900 font-medium">
                    {item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
