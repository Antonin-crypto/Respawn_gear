import React, { useContext } from "react";
import { CartContext } from "./contexts/CartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } =
    useContext(CartContext);
  console.log("Contenu du panier :", cart);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return <p>Votre panier est vide.</p>;
  }

  return (
    <div>
      <h2>Mon Panier</h2>
      <ul>
        {cart.map((item) => (
          <li key={item.id}>
            {item.name} - {item.price} € ×
            <input
              type="number"
              value={item.quantity}
              min="1"
              onChange={(e) =>
                updateQuantity(item.id, parseInt(e.target.value))
              }
              style={{ width: "50px", marginLeft: "5px" }}
            />
            <button onClick={() => removeFromCart(item.id)}>Supprimer</button>
          </li>
        ))}
      </ul>
      <h3>Total : {total} €</h3>
      <button onClick={clearCart} style={{ color: "red" }}>
        Vider le panier
      </button>
      <button>Passer la commande</button>
    </div>
  );
};

export default CartPage;
