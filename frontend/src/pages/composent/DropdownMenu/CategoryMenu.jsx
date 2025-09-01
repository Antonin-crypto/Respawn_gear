import { useNavigate } from "react-router-dom";

export default function CategoryMenu() {
  const navigate = useNavigate();

  const categories = [
    { name: "Consoles", slug: "consoles" },
    { name: "Accessoires", slug: "accessoires" },
    { name: "Jeux Vidéo", slug: "jeux-video" },
    { name: "PC Gaming", slug: "pc-gaming" },
    { name: "Composants", slug: "composants" },
    { name: "Écrans", slug: "ecrans" },
    { name: "Claviers", slug: "claviers" },
    { name: "Casques & Audio Gaming", slug: "casques-audio" },
    { name: "Souris", slug: "souris" },
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <ul className="space-y-3 text-gray-700">
      {categories.map((category, index) => (
        <li key={index}>
          <button
            onClick={() => handleCategoryClick(category.slug)}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {category.name}
          </button>
        </li>
      ))}
    </ul>
  );
}
