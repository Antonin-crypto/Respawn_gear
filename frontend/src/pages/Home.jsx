import React from "react";
import "../input.css";
import { trans } from "../translations";
import { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";

import Header from "./composent/Header";
import Footer from "../pages/composent/Footer";

export default function Home() {
  const [produit, setProduits] = useState([]);
  const [_, setLang] = useState("fr");
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    const handleLangUpdate = () => {
      setLang((prev) => prev + 1);
    };
    window.addEventListener("languagechange", handleLangUpdate);
    return () => {
      window.removeEventListener("languagechange", handleLangUpdate);
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produits/home_page")
      .then((res) => {
        console.log("Réponse backend :", res.data);
        setProduits(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des produits :", err);
      });
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <Header></Header>
      {/* Flash Sales */}
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h3 className="text-xl font-bold mb-4">{trans("Produits.avant")}</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {produit.slice(0, visibleCount).map((product) => (
            <Link
              key={product.id}
              to={`/produits/${product.id}`}
              className="border rounded-md p-4 text-center block hover:shadow-lg transition"
            >
              {product.images?.length > 0 ? (
                <img
                  src={`${product.images[0].url}?t=${Date.now()}`}
                  alt={product.name}
                  className="mx-auto mb-2 w-40 h-40 object-cover"
                />
              ) : (
                <p className="text-gray-400">Aucune image</p>
              )}
              <p className="font-medium">{product.name}</p>
              <p className="font-medium">{product.categorie?.name}</p>
              <p className="text-red-500 font-bold">{product.price} €</p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <button
            onClick={() =>
              visibleCount < produit.length
                ? setVisibleCount(produit.length)
                : setVisibleCount(4)
            }
            className="bg-red-500 text-white px-6 py-2 rounded-md font-medium"
          >
            {visibleCount < produit.length
              ? trans("Produits.voir_plus")
              : trans("Produits.voir_moins")}
          </button>
        </div>
      </section>
      {/* Footer */}
      <Footer></Footer>
    </div>
  );
}
