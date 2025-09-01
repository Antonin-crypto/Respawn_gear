const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Produit, Categorie } = require("../models/associations");
const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");
const authenticateToken = require("../middleware/authenticateToken");
const checkOwnership = require("../middleware/check_produit");

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
router.post(
  "/",
  authenticateToken,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const {
        name,
        name_en,
        description,
        description_en,
        price,
        categorie,
        stock,
      } = req.body;

      const newproduit = await Produit.create({
        name,
        name_en,
        description,
        description_en,
        price,
        categorie,
        stock,
        userId: req.user.id,
      });
      console.log(" Produit inséré en base :", newproduit.toJSON());
      const imageUploads = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      await Promise.all(
        imageUploads.map((url) =>
          Image.create({ url, produitId: newproduit.id })
        )
      );
      console.log("Utilisateur connecté :", req.user);
      console.log("Produit créé :", newproduit);
      res.status(201).json({ produit: newproduit, images: imageUploads });
    } catch (error) {
      console.error(" Erreur POST /produits :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

// 🔒 UPDATE
router.put(
  "/:id",
  authenticateToken,
  checkOwnership,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, description, price, categorie, stock } = req.body;

      req.produit.name = name || req.produit.name;
      req.produit.description = description || req.produit.description;
      req.produit.price = price || req.produit.price;
      req.produit.categorie = categorie || req.produit.categorie;
      req.produit.stock = stock || req.produit.stock;
      await req.produit.save();

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

      const produitAvecImages = await req.produit.reload({
        include: ["images"],
      });

      res.json(produitAvecImages);
    } catch (error) {
      console.error("❌ Erreur PUT /produits/:id :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

// 🔒 DELETE
router.delete("/:id", authenticateToken, checkOwnership, async (req, res) => {
  try {
    await req.produit.destroy();
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    console.error("❌ Erreur DELETE /produits/:id :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
