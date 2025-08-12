import React, { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div stytle={{ border: "1px solid #ccc", padding: "10px" }}>
      <h3>{product.name}</h3>
      <p>Prix: {product.price} €</p>
      <button onClick={() => addToCart(product)}>Ajouter au panier </button>
    </div>
  );
};

export default ProductCard;
