const { Produit, Categorie, Brand } = require("../models/associations");
const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");

// Fonction helper pour uploader un fichier vers Cloudinary
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      // On envoie l'image dans le dossier "produits" sur Cloudinary
      .upload_stream({ folder: "produits" }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url); // On récupère l’URL sécurisée de l’image
      })
      .end(fileBuffer); // On envoie le buffer du fichier à Cloudinary
  });
};

// CREATE
exports.createProduit = async (req, res) => {
  try {
    // Récupération des champs envoyés depuis le frontend
    const {
      name,
      name_en,
      description,
      description_en,
      price,
      categorieId,
      stock,
      brandId,
    } = req.body;

    // Création du produit dans la base de données
    const newProduit = await Produit.create({
      name,
      name_en,
      description,
      description_en,
      price,
      categorieId,
      stock,
      brandId,
      userId: req.user.id,
    });

    // Upload images sur Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    // Enregistrement des URLs des images en BDD avec l'id du produit
    await Promise.all(
      imageUploads.map((url) => Image.create({ url, produitId: newProduit.id }))
    );

    // Réponse au client avec le produit créé + les images uploadées
    res.status(201).json({ produit: newProduit, images: imageUploads });
  } catch (error) {
    console.error(" Erreur createProduit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE → Mettre à jour un produit
exports.updateProduit = async (req, res) => {
  try {
    // Récupération des champs envoyés depuis le frontend
    const { name, description, price, categorie, stock, brand } = req.body;

    // Mise à jour seulement des champs envoyés
    req.produit.name = name || req.produit.name;
    req.produit.description = description || req.produit.description;
    req.produit.price = price || req.produit.price;
    req.produit.categorie = categorie || req.produit.categorie;
    req.produit.stock = stock || req.produit.stock;
    req.produit.brand = brand || req.produit.brand;

    // Sauvegarde des modifications
    await req.produit.save();

    // Si de nouvelles images sont envoyées, on les upload
    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer).then((url) => ({
            url,
            produitId: req.produit.id,
          }))
        )
      );

      // Ajout des nouvelles images dans la base
      await Image.bulkCreate(uploadedImages);
    }

    // Recharger le produit avec ses images associées pour renvoyer les données complètes
    const produitAvecImages = await req.produit.reload({ include: ["images"] });
    res.json(produitAvecImages);
  } catch (error) {
    console.error(" Erreur updateProduit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE → Supprimer un produit
exports.deleteProduit = async (req, res) => {
  try {
    // Suppression du produit de la base
    await req.produit.destroy();
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    console.error(" Erreur deleteProduit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
