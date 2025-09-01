import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ProductDetail({ onProductLoaded }) {
  const [produit, setProduit] = useState(null);
  const { id } = useParams();

  console.log("🟣 ProductDetail - ID reçu en prop :", id);

  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:5000/api/produits/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("Réponse brute backend :", res.data);
        console.log(" ProductDetail - Produit chargé :", res.data);
        console.log(" useEffect déclenché avec ID :", id);
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
      {produit.images?.length > 0 ? (
        produit.images.map((img, i) => (
          <img
            key={i}
            src={img.url}
            alt={`${produit.name} ${i}`}
            style={{ maxWidth: "300px", height: "auto" }}
          />
        ))
      ) : (
        <p>Aucune image disponible</p>
      )}
    </div>
  );
}

export default ProductDetail;
