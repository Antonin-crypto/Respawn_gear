import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Heart,
  Eye,
  Star,
  Filter,
  Grid,
  List,
  ChevronDown,
} from "lucide-react";
import Footer from "../pages/composent/Footer";
import { trans, setLanguage } from "../translations/index";
import logo from "../pages/composent/images/Logo de Respawn Gear.png";
import DropdownMenu from "./composent/DropdownMenu/DropdownMenu";
import { useCart } from "../pages/contexts/CartContext";
import { useNavigate } from "react-router-dom";
import HeaderPage from "./composent/Header_page";
export default function CategoryPage() {
  const [produits, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState("grid");
  const { categorySlug } = useParams();
  const [sortBy, setSortBy] = useState("featured");

  const { addToCart } = useCart();
  const navigate = useNavigate();
  console.log(" Produit reçu par addToCart :", produits);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/produits/category/${categorySlug}`
        );
        setProducts(
          Array.isArray(response.data)
            ? response.data
            : response.data.produits || []
        );
      } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
      }
    };

    fetchProducts();
  }, [categorySlug]);

  const [lang, setLang] = useState("fr");

  const handleClick = () => {
    navigate("/panier");
  };

  const handleLangChange = (e) => {
    const newLang = e.target.value;
    setLang(newLang);
    setLanguage(newLang);
  };
  const categoryInfo = {
    name: categorySlug,
    description: `Découvrez notre sélection de ${categorySlug}`,
    totalProducts: produits.length,
  };

  const handleAddToWishlist = (productId) => {
    console.log(`Produit ${productId} ajouté aux favoris`);
  };

  const handleQuickView = (productId) => {
    console.log(`Vue rapide du produit ${productId}`);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            className={`${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };
  console.log(addToCart);
  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden group hover:shadow-md transition-shadow duration-300">
      <div className="relative">
        <img
          src={
            product.images && product.images.length > 0
              ? product.images[0].url
              : "/placeholder.png"
          }
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onClick={() => navigate(`/produits/${product.id}`)}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 space-y-1">
          {product.discount && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
              -{product.discount}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
              NOUVEAU
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-y-2">
          <button
            onClick={() => handleAddToWishlist(product.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
          >
            <Heart size={16} className="text-gray-600 hover:text-red-500" />
          </button>
          <button
            onClick={() => handleQuickView(product.id)}
            className="p-2 bg-white rounded-full shadow-md hover:bg-blue-50 transition-colors"
          >
            <Eye size={16} className="text-gray-600 hover:text-blue-500" />
          </button>
        </div>

        {/* Stock status */}
        {!product.stock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-medium">Rupture de stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center space-x-2 mb-3">
          {renderStars(product.rating)}
          <span className="text-sm text-gray-500">({product.description})</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-red-600">
              €{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                €{product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={!product.stock}
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-sm"
          >
            {product.stock ? "Ajouter" : "Indisponible"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderPage></HeaderPage>
      {/* Header de la page */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
            <a href="/home" className="hover:text-black transition-colors">
              Accueil
            </a>
            <span>/</span>
            <span className="text-black font-medium">{categoryInfo.name}</span>
          </nav>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {categoryInfo.name}
              </h1>
              <p className="text-gray-600 mb-2">{categoryInfo.description}</p>
              <p className="text-sm text-gray-500">
                {categoryInfo.totalProducts} produits trouvés
              </p>
            </div>

            {/* Contrôles d'affichage */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded ${
                    viewMode === "grid"
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded ${
                    viewMode === "list"
                      ? "bg-black text-white"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>

              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="featured">Recommandés</option>
                  <option value="price-low">Prix croissant</option>
                  <option value="price-high">Prix décroissant</option>
                  <option value="rating">Mieux notés</option>
                  <option value="newest">Plus récents</option>
                </select>
                <ChevronDown
                  size={16}
                  className="absolute right-2 top-3 text-gray-400 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filtres */}
          <div className="w-64 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter size={16} className="mr-2" />
                Filtres
              </h3>

              {/* Prix */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Prix</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Moins de 50€</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">50€ - 100€</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Plus de 100€</span>
                  </label>
                </div>
              </div>

              {/* Marques */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-900 mb-3">Marques</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Logitech</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">Razer</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <span className="text-sm">SteelSeries</span>
                  </label>
                </div>
              </div>

              {/* Disponibilité */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Disponibilité
                </h4>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">En stock seulement</span>
                </label>
              </div>
            </div>
          </div>

          {/* Grille de produits */}
          <div className="flex-1">
            <div
              className={`grid gap-6 ${
                viewMode === "grid"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1"
              }`}
            >
              {produits.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center mt-12 space-x-2">
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                Précédent
              </button>
              <button className="px-4 py-2 bg-black text-white rounded">
                1
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50">
                Suivant
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
}
