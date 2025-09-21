import { useNavigate } from "react-router-dom";
import { trans } from "../../../translations";
export default function CategoryMenu() {
  const navigate = useNavigate();

  const categories = [
    "consoles",
    "accessoires",
    "jeux-video",
    "pc-gaming",
    "composants",
    "ecrans",
    "claviers",
    "casques-audio-gaming",
    "souris",
  ];

  const handleCategoryClick = (slug) => {
    navigate(`/category/${slug}`);
  };

  return (
    <ul className="space-y-3 text-gray-700">
      {categories.map((slug, index) => (
        <li key={index}>
          <button
            onClick={() => handleCategoryClick(slug)}
            className="hover:text-blue-600 transition-colors cursor-pointer"
          >
            {trans(`categories.${slug}`)}
          </button>
        </li>
      ))}
    </ul>
  );
}
