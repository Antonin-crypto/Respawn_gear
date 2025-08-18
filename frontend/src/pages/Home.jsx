// Home.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Home() {
  const [produits, setProduits] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/produits/home")
      .then((res) => setProduits(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Accueil</h1>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {produits.map((prod) => (
          <div
            key={prod.id}
            style={{ border: "1px solid #ccc", padding: "10px" }}
          >
            {/* image principale (première du tableau) */}
            {prod.images && prod.images.length > 0 && (
              <img
                src={prod.images[0].url}
                alt={prod.name}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
            )}
            <h3>{prod.name}</h3>
            <p>{prod.price} €</p>
            <Link to={`/produit/${prod.id}`}>Voir le produit</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
