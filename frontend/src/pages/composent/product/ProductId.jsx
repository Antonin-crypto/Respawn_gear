import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const ProductId = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [produit, setProduits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/produits/${id}`);
        setProduct(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Erreur de récupération produit:", err);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

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

  if (loading) return <p>Chargement...</p>;
  if (!product) return <p>Produit introuvable.</p>;

  return (
    <div className="p-10">
      {/* Fil d’Ariane */}
      <div className="text-sm text-gray-500 mb-4">
        Home / Gaming / <span className="text-black">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images produit */}
        <div className="flex space-x-4">
          <div className="flex flex-col space-y-4">
            {product.images?.slice(1).map((img, i) => (
              <img
                key={i}
                src={`${img.url}?t=${Date.now()}`}
                alt={`${product.name} ${i}`}
                style={{ maxWidth: "200px", height: "auto" }}
              />
            ))}
          </div>
          <div className="flex-1">
            <img
              src={product.images?.[0].url}
              alt={product.name}
              className="max-w-[300px] h-auto rounded-lg border"
            />
          </div>
        </div>

        {/* Infos produit */}
        <div>
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-red-500 mt-2 text-xl">${product.price}</p>
          <p className="text-gray-600 mt-2">{product.description}</p>

          {/* Couleurs */}
          {product.colours?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Colours</h4>
              <div className="flex space-x-3">
                {product.colours.map((color, i) => (
                  <span
                    key={i}
                    className="w-8 h-8 rounded-full border flex items-center justify-center cursor-pointer"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Tailles */}
          {product.sizes?.length > 0 && (
            <div className="mt-4">
              <h4 className="font-medium mb-2">Size</h4>
              <div className="flex space-x-2">
                {product.sizes.map((size, i) => (
                  <button
                    key={i}
                    className="px-3 py-1 border rounded-lg hover:bg-gray-200"
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Boutons */}
          <div className="mt-6 flex space-x-4">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600"
              onClick={() => {
                addToCart(product);
                navigate("/panier");
              }}
            >
              Buy Now
            </button>
            <button
              className="border px-6 py-2 rounded-lg hover:bg-gray-200"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>

          {/* Infos livraison */}
          <div className="mt-6 border rounded-lg p-4 space-y-2 text-sm text-gray-600">
            <p>🚚 Free Delivery — Enter your postal code for availability.</p>
            <p>↩️ Return Delivery — Free 30 days delivery returns.</p>
          </div>
        </div>
      </div>
      <section className="max-w-7xl mx-auto px-6 mt-12">
        <h3 className="text-xl font-bold mb-4">produits mis en avant</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {produit.slice(0, 4).map((product) => (
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
              <p className="font-medium">{product.description}</p>
              <p className="font-medium">{product.categorie}</p>
              <p className="text-red-500 font-bold">
                ${product.price}{" "}
                <span className="line-through text-gray-400">
                  ${product.oldPrice}
                </span>
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <button className="bg-red-500 text-white px-6 py-2 rounded-md font-medium">
            View All Products
          </button>
        </div>
      </section>
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

export default ProductId;
