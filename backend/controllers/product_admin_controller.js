const { Produit, Categorie } = require("../models/associations");
const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");

// Upload Cloudinary helper
const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "produits" }, (error, result) => {
        if (error) return reject(error);
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};

// CREATE
exports.createProduit = async (req, res) => {
  try {
    const {
      name,
      name_en,
      description,
      description_en,
      price,
      categorieId,
      stock,
    } = req.body;

    const newProduit = await Produit.create({
      name,
      name_en,
      description,
      description_en,
      price,
      categorieId,
      stock,
      userId: req.user.id,
    });

    // Upload images sur Cloudinary
    const imageUploads = await Promise.all(
      req.files.map((file) => uploadToCloudinary(file.buffer))
    );

    await Promise.all(
      imageUploads.map((url) => Image.create({ url, produitId: newProduit.id }))
    );

    res.status(201).json({ produit: newProduit, images: imageUploads });
  } catch (error) {
    console.error(" Erreur createProduit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// UPDATE
exports.updateProduit = async (req, res) => {
  try {
    const { name, description, price, categorie, stock } = req.body;

    req.produit.name = name || req.produit.name;
    req.produit.description = description || req.produit.description;
    req.produit.price = price || req.produit.price;
    req.produit.categorie = categorie || req.produit.categorie;
    req.produit.stock = stock || req.produit.stock;

    await req.produit.save();

    // Upload de nouvelles images
    if (req.files && req.files.length > 0) {
      const uploadedImages = await Promise.all(
        req.files.map((file) =>
          uploadToCloudinary(file.buffer).then((url) => ({
            url,
            produitId: req.produit.id,
          }))
        )
      );

      await Image.bulkCreate(uploadedImages);
    }

    const produitAvecImages = await req.produit.reload({ include: ["images"] });
    res.json(produitAvecImages);
  } catch (error) {
    console.error(" Erreur updateProduit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// DELETE
exports.deleteProduit = async (req, res) => {
  try {
    await req.produit.destroy();
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    console.error(" Erreur deleteProduit :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};
