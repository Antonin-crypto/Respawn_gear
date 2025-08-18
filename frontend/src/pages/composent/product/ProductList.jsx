import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const ProductList = ({ onSelect }) => {
  const [produits, setProduits] = useState([]);
  const [filtre, setFiltre] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/produits/home", { withCredentials: true })
      .then((res) => {
        console.log("Réponse backend :", res.data);
        setProduits(res.data);
      })
      .catch((err) => {
        console.error("Erreur lors du chargement des produits :", err);
      });
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Tu veux vraiment supprimer ce produit ?")) return;

    axios
      .delete(`http://localhost:5000/produits/${id}`, { withCredentials: true })
      .then(() => {
        setProduits(produits.filter((p) => p.id !== id));
      })
      .catch((err) => {
        console.error("Erreur lors de la suppression :", err);
      });
  };

  //  Filtrage côté frontend
  const produitsFiltres = produits.filter(
    (produit) =>
      produit.name.toLowerCase().includes(filtre.toLowerCase()) ||
      produit.categorie.toLowerCase().includes(filtre.toLowerCase())
  );

  return (
    <div>
      <h2>Liste des produits</h2>

      <Link to="/produits/nouveau">
        <button>+ Ajouter un produit</button>
      </Link>

      <div>
        <input
          type="text"
          placeholder="🔍 Rechercher par nom ou catégorie"
          value={filtre}
          onChange={(e) => setFiltre(e.target.value)}
        />
      </div>

      {produitsFiltres.length === 0 ? (
        <p>Aucun produit trouvé.</p>
      ) : (
        <ul>
          {produitsFiltres.map((produit) => (
            <li
              key={produit.id}
              style={{ cursor: "pointer" }}
              onClick={() => onSelect(produit.id)}
            >
              {produit.images?.length > 0 ? (
                produit.images.map((img, i) => (
                  <img
                    key={i}
                    src={`${img.url}?t=${Date.now()}`}
                    alt={`${produit.name} ${i}`}
                    style={{ maxWidth: "300px", height: "auto" }}
                  />
                ))
              ) : (
                <p>Aucune image disponible</p>
              )}

              <h3>{produit.name}</h3>
              <p>{produit.description}</p>
              <p>Prix : {produit.price}€</p>
              <p>Catégorie : {produit.categorie}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/produits/modifier/${produit.id}`);
                }}
              >
                Modifier
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(produit.id);
                }}
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ProductList;
