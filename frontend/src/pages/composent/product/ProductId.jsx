import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";
import HeaderPage from "../Header_page";
import Footer from "../Footer";

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
    <div className="min-h-screen bg-gray-50">
      {/* Fil d’Ariane */}
      <HeaderPage></HeaderPage>

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
          <p className="text-gray-600 mt-2 line-clamp-3 ">
            {product.description}
          </p>

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
              <p className="font-medium">{product.categorie.name}</p>
              <p className="text-red-500 font-bold">
                ${product.price}{" "}
                <span className="line-through text-gray-400">
                  ${product.oldPrice}
                </span>
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-6"></div>
      </section>
      <Footer></Footer>
    </div>
  );
};

export default ProductId;
