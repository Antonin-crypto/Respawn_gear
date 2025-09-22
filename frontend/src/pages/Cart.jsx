import React, { useContext, useState } from "react";
import { CartContext } from "./contexts/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "./composent/Footer";
import HeaderPage from "./composent/Header_page";
const CartPage = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);

  const [promoCode, setPromoCode] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const finalTotal = total;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderPage></HeaderPage>
      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Table Header */}
              <div className="grid grid-cols-4 gap-4 p-6 border-b border-gray-200 text-sm font-medium text-gray-700">
                <div>Product</div>
                <div className="text-center">Price</div>
                <div className="text-center">Quantity</div>
                <div className="text-center">Subtotal</div>
              </div>

              {/* Cart Items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 gap-4 p-6 border-b border-gray-100 items-center"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-12 bg-red-100 rounded flex-shrink-0">
                      {item.images?.length > 0 ? (
                        <img
                          src={`${item.images[0].url}?t=${Date.now()}`}
                          alt={item.name}
                          className="mx-auto mb-2"
                        />
                      ) : (
                        <p className="text-gray-400">Aucune image</p>
                      )}
                    </div>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <div className="text-center text-sm">{item.price} €</div>
                  <div className="text-center">
                    <input
                      type="number"
                      value={item.quantity}
                      min="1"
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center text-sm"
                    />
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-medium">
                      {(item.price * item.quantity).toFixed(2)} €
                    </span>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-4 text-red-500 hover:text-red-700 text-sm"
                    >
                      Supprimer
                    </button>
                  </div>
                </div>
              ))}

              {/* Action Buttons */}
              <div className="flex justify-between items-center p-6">
                <button
                  onClick={() => window.history.back()}
                  className="px-6 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50"
                >
                  Return To Shop
                </button>
                <button
                  onClick={clearCart}
                  className="px-6 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                >
                  Vider le panier
                </button>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="flex items-center space-x-4 mt-6">
              <input
                type="text"
                placeholder="Coupon Code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1 px-4 py-3 border border-gray-300 rounded text-sm"
              />
              <button className="px-8 py-3 bg-red-500 text-white rounded text-sm hover:bg-red-600">
                Apply Coupon
              </button>
            </div>
          </div>

          {/* Cart Total Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium mb-6">Cart Total</h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Total:</span>
                  <span>{finalTotal.toFixed(2)} €</span>
                </div>
              </div>

              <button
                className="w-full bg-red-500 text-white py-3 rounded hover:bg-red-600 transition-colors"
                onClick={() => navigate(`/checkout`)}
              >
                Passer la commande
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer></Footer>
    </div>
  );
};

export default CartPage;
