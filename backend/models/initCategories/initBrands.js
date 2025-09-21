const Brand = require("../brand"); // ton modèle Sequelize

const brands = [
  { name: "Nintendo" },
  { name: "Sony" },
  { name: "Microsoft" },
  { name: "SteelSeries" },
  { name: "Razer" },
  { name: "Logitech" },
  { name: "MSI" },
  { name: "DELL" },
  { name: "Asus" },
];

function slugify(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

async function initBrands() {
  try {
    for (const { name } of brands) {
      const slug = slugify(name);
      const [brand, created] = await Brand.findOrCreate({
        where: { slug },
        defaults: { name, slug },
      });

      if (created) {
        console.log(`Ajouté : ${name}`);
      } else {
        console.log(`ℹDéjà existant : ${name}`);
      }
    }
  } catch (err) {
    console.error(" Erreur seed brands :", err);
  } finally {
    process.exit(); // termine proprement
  }
}

initBrands();
