import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categorie: "",
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:5000/produits/${id}`, { withCredentials: true })
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error("Erreur lors du chargement du produit :", err);
        });
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const request = isEdit
      ? axios.put(`http://localhost:5000/produits/${id}`, formData, {
          withCredentials: true,
        })
      : axios.post("http://localhost:5000/produits", formData, {
          withCredentials: true,
        });

    request
      .then(() => {
        navigate("/produit");
      })
      .catch((err) => {
        console.error("Erreur lors de l’envoi du formulaire :", err);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? "Modifier un produit" : "Ajouter un produit"}</h2>

      <label>Nom :</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <label>Description :</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />

      <label>Prix :</label>
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        required
      />

      <label>Catégorie :</label>
      <input
        type="text"
        name="categorie"
        value={formData.categorie}
        onChange={handleChange}
        required
      />

      <button type="submit">{isEdit ? "Modifier" : "Ajouter"}</button>
    </form>
  );
};

export default ProductForm;
