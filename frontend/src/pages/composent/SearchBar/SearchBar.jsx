// components/SearchBar.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

function SearchBar({ placeholder, produits }) {
  const [query, setQuery] = useState("");

  const filteredProduits = produits.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="relative w-64">
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder={placeholder || "Rechercher..."}
        className="w-full border rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      {query && (
        <ul className="mt-4 space-y-2 absolute bg-white border rounded-md w-full z-10 max-h-60 overflow-auto">
          {filteredProduits.length > 0 ? (
            filteredProduits.map((p) => (
              <li key={p.id}>
                <Link
                  to={`/produits/${p.id}`}
                  className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-lg"
                >
                  {p.images?.[0]?.url ? (
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-200 rounded" />
                  )}
                  <span>{p.name}</span>
                </Link>
              </li>
            ))
          ) : (
            <li className="p-2 text-gray-500">Aucun produit trouvé</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
