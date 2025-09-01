import React, { useState, useEffect } from "react";
import { Search, Plus, Edit3, Trash2, ShoppingBag, Filter } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = ({ onSelect = () => {} }) => {
  const [produits, setProduits] = useState([]);
  const [filtre, setFiltre] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produits/home", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Réponse backend :", res.data);
        console.log("🧐 Données produits :", res.data);
        console.log(
          "🧐 Données produits détaillées :",
          JSON.stringify(res.data, null, 2)
        );
        setProduits(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des produits :", err);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Tu veux vraiment supprimer ce produit ?")) return;

    axios
      .delete(`http://localhost:5000/api/admin/produits/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        setProduits(produits.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression :", err);
      });
  };

  // Filtrage côté frontend
  const produitsFiltres = produits.filter(
    (produit) =>
      produit.name.toLowerCase().includes(filtre.toLowerCase()) ||
      produit.categorie.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <ShoppingBag className="h-8 w-8 text-red-600" />
              <h1 className="text-2xl font-bold text-gray-900">
                Administration Produits
              </h1>
            </div>
            <Link to="/produits/nouveau">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-colors">
                <Plus className="h-5 w-5" />
                <span>Ajouter un produit</span>
              </button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Rechercher par nom ou catégorie..."
              value={filtre}
              onChange={(e) => setFiltre(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Produits
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {produits.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Produits Filtrés
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {produitsFiltres.length}
                </p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Filter className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Catégories</p>
                <p className="text-3xl font-bold text-gray-900">
                  {new Set(produits.map((p) => p.categorie)).size}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <div className="h-6 w-6 bg-purple-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {produitsFiltres.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              Aucun produit trouvé
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {produits.length === 0
                ? "Commencez par ajouter votre premier produit."
                : "Essayez de modifier vos critères de recherche."}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {produitsFiltres.map((produit) => (
              <div
                key={produit.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer"
                onClick={() => {
                  console.log("✅ Produit cliqué :", produit.id);
                  onSelect(produit.id);
                }}
              >
                {/* Product Image */}
                <div className="aspect-w-1 aspect-h-1 h-48 bg-gray-100">
                  {produit.images?.length > 0 ? (
                    <img
                      src={`${produit.images[0].url}?t=${Date.now()}`}
                      alt={produit.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <ShoppingBag className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <div className="mb-3">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-1">
                      {produit.name}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {produit.description}
                    </p>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {produit.categorie}
                    </span>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-red-600">
                      {produit.price}€
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/produits/modifier/${produit.id}`);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Edit3 className="h-4 w-4" />
                      <span>Modifier</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(produit.id);
                      }}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-1 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>Supprimer</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
