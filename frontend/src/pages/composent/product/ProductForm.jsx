import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    name_en: "",
    description: "",
    description_en: "",
    price: "",
    categorieId: "",
    stock: "",
    images: "",
  });

  const [images, setImages] = useState([]);
  const isEdit = Boolean(id);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/produits/categories", {
        withCredentials: true,
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Erreur catégories :", err));
  }, []);

  useEffect(() => {
    if (isEdit) {
      axios
        .get(`http://localhost:5000/api/produits/${id}`, {
          withCredentials: true,
        })
        .then((res) => setFormData(res.data))
        .catch((err) => console.error("Erreur produit :", err));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert("Vous ne pouvez pas sélectionner plus de 5 images");
      return;
    }
    setImages(files);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images") data.append(key, value);
    });

    if (images.length > 0) {
      images.forEach((file) => {
        data.append("images", file);
      });
    } else if (isEdit) {
      data.append("keepExistingImages", true);
    }

    const request = isEdit
      ? axios.put(`http://localhost:5000/api/admin/produits/${id}`, data, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
      : axios.post("http://localhost:5000/api/admin/produits", data, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        });

    request
      .then(() => navigate("/produit"))
      .catch((err) => console.error("Erreur envoi formulaire :", err));
  };

  return (
    <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-2xl mt-10">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">
        {isEdit ? "Modifier un produit" : "Ajouter un produit"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {/* Colonne gauche */}
        <div className="flex flex-col gap-4">
          <label className="font-medium">Nom</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />

          <label className="font-medium">Nom en anglais</label>
          <input
            type="text"
            name="name_en"
            value={formData.name_en}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />

          <label className="font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="border p-2 rounded-md h-24"
          />

          <label className="font-medium">Description en anglais</label>
          <textarea
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            required
            className="border p-2 rounded-md h-24"
          />
        </div>

        {/* Colonne droite */}
        <div className="flex flex-col gap-4">
          <label className="font-medium">Prix</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />

          <label className="font-medium">Catégorie</label>
          <select
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          >
            <option value="">-- Choisir une catégorie --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} / {cat.name_en}
              </option>
            ))}
          </select>

          <label className="font-medium">Stock</label>
          <input
            type="number"
            min="0"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            required
            className="border p-2 rounded-md"
          />

          <label className="font-medium">Images (max 5)</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="border p-2 rounded-md"
          />
        </div>

        {/* Bouton en bas */}
        <div className="col-span-2 flex justify-end mt-6">
          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded-md shadow-md transition transform hover:scale-105"
          >
            {isEdit ? "Modifier" : "Ajouter"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
