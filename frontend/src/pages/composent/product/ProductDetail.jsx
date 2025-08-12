import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail({ id, onProductLoaded }) {
  const [produit, setProduit] = useState(null);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/produits/${id}`, { withCredentials: true })
      .then((res) => {
        setProduit(res.data);
        console.log("Produit chargé :", res.data);
        if (onProductLoaded) onProductLoaded(res.data);
      })
      .catch((err) => console.error(err));
  }, [id, onProductLoaded]);

  if (!produit) return <p>Chargement...</p>;

  return (
    <div>
      <h2>{produit.name}</h2>
      <p>{produit.description}</p>
      <p>Prix : {produit.price}€</p>
      <p>Catégorie : {produit.categorie}</p>
    </div>
  );
}

export default ProductDetail;
