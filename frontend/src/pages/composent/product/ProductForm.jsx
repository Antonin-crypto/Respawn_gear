import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    name_en: "",
    description: "",
    description_en: "",
    price: "",
    categorie: "",
    stock: "",
    images: "",
  });

  const [images, setImages] = useState([]);
  const isEdit = Boolean(id);
  console.log("isEdit =", isEdit);
  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:5000/api/produits/${id}`, {
          withCredentials: true,
        })
        .then((res) => {
          setFormData(res.data);
          console.log("isEdit =", isEdit);
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

  // Gestion des images
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Fichiers sélectionnés :", files);
    if (files.length > 5) {
      alert("Vous ne pouvez pas sélectionner plus de 5 images");
      return;
    }
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    console.log("Formulaire soumis avec :", formData);
    console.log("Images à envoyer :", images);
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") data.append(key, value);
    });
    // Ajout des images
    if (images.length > 0) {
      // Ajouter les nouvelles images sélectionnées
      images.forEach((file) => {
        data.append("images", file);
      });
    } else if (isEdit) {
      // Informer le backend de garder les images existantes
      data.append("keepExistingImages", true);
    }

    console.log("1");
    console.log(
      "🌐 URL de la requête :",
      isEdit
        ? `http://localhost:5000/api/admin/produits/${id}`
        : "http://localhost:5000/api/admin/produits"
    );
    const request = isEdit
      ? axios.put(`http://localhost:5000/api/admin/produits/${id}`, formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axios.post("http://localhost:5000/api/admin/produits", data, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

    console.log("2", request);
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
      <label>Nom en anglais :</label>
      <input
        type="text"
        name="name_en"
        value={formData.name_en}
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
      <label>Description anglais :</label>
      <textarea
        name="description_en"
        value={formData.description_en}
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
      <label>stock </label>
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        required
      />

      <label>Images (max 5) :</label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
      />

      <button type="submit">{isEdit ? "Modifier" : "Ajouter"}</button>
    </form>
  );
};

export default ProductForm;
