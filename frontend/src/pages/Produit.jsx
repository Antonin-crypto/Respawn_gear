import React, { useState, useContext } from "react";
import ProductList from "./composent/product/ProductList";
import ProductDetail from "./composent/product/ProductDetail";
import { CartContext } from "./contexts/CartContext";

function Produit() {
  const [id, setSelectedId] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addToCart } = useContext(CartContext);

  return (
    <div>
      <ProductList onSelect={setSelectedId} />
      {id && <ProductDetail id={id} onProductLoaded={setSelectedProduct} />}
      {selectedProduct && (
        <button onClick={() => addToCart(selectedProduct)}>
          Ajouter au panier
        </button>
      )}
    </div>
  );
}

export default Produit;
