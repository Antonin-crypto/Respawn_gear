const Categorie = require("../categorie");

const categorie = [
  { name: "Consoles", name_en: "Consoles" },
  { name: "Accessoires", name_en: "Accessories" },
  { name: "Jeux Vidéo", name_en: "Video Games" },
  { name: "PC Gaming", name_en: "PC Gaming" },
  { name: "Composants", name_en: "Components" },
  { name: "Écrans", name_en: "Monitors" },
  { name: "Claviers", name_en: "Keyboards" },
  { name: "Casques & Audio Gaming", name_en: "Headsets & Audio" },
  { name: "Souris", name_en: "Mice" },
];

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/ & /g, "-")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function initCategories() {
  for (const { name, name_en } of categorie) {
    const slug = slugify(name);
    const slug_en = slugify(name_en);
    await Categorie.findOrCreate({
      where: { slug },
      defaults: { name: name, name_en: name_en, slug, slug_en },
    });
  }
}

initCategories();
