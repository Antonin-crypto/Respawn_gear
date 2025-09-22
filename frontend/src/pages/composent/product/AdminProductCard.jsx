import React, { useState } from "react";
import { ShoppingBag, X, Edit3, Trash2 } from "lucide-react";

const AdminProductCard = ({ produit, onDelete, onEdit }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      {/* Carte produit */}
      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
        {/* Clic pour modal */}
        <div className="cursor-pointer" onClick={() => setShowDetails(true)}>
          <div className="aspect-w-1 aspect-h-1 h-48 bg-gray-100">
            {produit.images?.length > 0 ? (
              <img
                src={`${produit.images[0].url}?t=${Date.now()}`}
                alt={produit.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ShoppingBag className="h-12 w-12 text-gray-400" />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {produit.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              {produit.categorie?.name}
            </span>
          </div>
        </div>

        {/* Boutons */}
        <div className="flex space-x-2 p-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit(produit.id);
            }}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-1 transition-colors"
          >
            <Edit3 className="h-4 w-4" />
            <span>Modifier</span>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(produit.id);
            }}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center space-x-1 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            <span>Supprimer</span>
          </button>
        </div>
      </div>

      {/* Modal */}
      {showDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl w-11/12 md:w-1/2 p-6 relative">
            <button
              onClick={() => setShowDetails(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-900"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold mb-4">{produit.name}</h2>
            <img
              src={`${produit.images[0]?.url}?t=${Date.now()}`}
              alt={produit.name}
              className="w-full h-64 object-cover mb-4 rounded"
            />
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Description: </span>
              {produit.description}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Catégorie: </span>
              {produit.categorie?.name}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Prix: </span>
              {produit.price}€
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProductCard;
