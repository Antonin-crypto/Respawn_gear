const express = require("express");
const router = express.Router();
const multer = require("multer");
const Produit = require("../models/produit");
const authenticateToken = require("../middleware/authenticateToken");
const checkOwnership = require("../middleware/check_produit");
const Image = require("../models/Image");
const cloudinary = require("../config/cloudinary");

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadToCloudinary = (fileBuffer) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: "produits" }, (error, result) => {
        if (error) {
          console.error("❌ Erreur Cloudinary :", error);
          return reject(error);
        }
        console.log("✅ Image uploadée :", result.secure_url);
        resolve(result.secure_url);
      })
      .end(fileBuffer);
  });
};

router.get("/home", async (req, res) => {
  const produits = await Produit.findAll({
    include: [{ model: Image, as: "images", limit: 1 }],
  });
  res.json(produits);
});

router.get("/:id", async (req, res) => {
  const produit = await Produit.findByPk(req.params.id, {
    include: [{ model: Image, as: "images" }],
  });
  if (!produit) return res.status(404).json({ message: "Produit non trouvé" });
  res.json(produit);
});

router.post(
  "/",
  authenticateToken,
  upload.array("images", 5),
  async (req, res) => {
    console.log("POST /produits reçu :", {
      body: req.body,
      files: req.files.length,
    });
    try {
      const { name, name_en, description, description_en, price, categorie } =
        req.body;

      const newproduit = await Produit.create({
        name,
        name_en,
        description,
        description_en,
        price,
        categorie,
        userId: req.user.id,
      });
      console.warn("⚠️ Champs manquants :", {
        name,
        name_en,
        description_en,
        description,
        price,
        categorie,
      });
      const imageUploads = await Promise.all(
        req.files.map((file) => uploadToCloudinary(file.buffer))
      );

      await Promise.all(
        imageUploads.map((url) =>
          Image.create({ url, produitId: newproduit.id })
        )
      );

      res.status(201).json({ produit: newproduit, images: imageUploads });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

//router.put(
//  "/:id",
//  authenticateToken,
//  checkOwnership,
//  upload.array("images", 5),
//  async (req, res) => {
//    try {
//      const { name, description, price, categorie } = req.body;
//      console.log("📩 Données reçues :", req.body);
//      console.log("🛠 Produit ciblé :", req.produit);
//      await req.produit.update({ name, description, price, categorie });
//      res.json(req.produit);
//    } catch (error) {
//     console.error("❌ Erreur lors de la mise à jour du produit :", error);
//      res.status(500).json({ message: "Erreur serveur" });
//    }
//  }
//);

router.put(
  "/:id",
  authenticateToken,
  checkOwnership,
  upload.array("images", 5),
  async (req, res) => {
    try {
      const { name, description, price, categorie } = req.body;

      req.produit.name = name || req.produit.name;
      req.produit.description = description || req.produit.description;
      req.produit.price = price || req.produit.price;
      req.produit.categorie = categorie || req.produit.categorie;
      await req.produit.save();

      if (req.files && req.files.length > 0) {
        const uploadedImages = [];

        for (const file of req.files) {
          const result = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              { folder: "produits" },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            );
            stream.end(file.buffer);
          });

          uploadedImages.push({
            url: result.secure_url,
            produitId: req.produit.id,
          });
        }

        await Image.bulkCreate(uploadedImages);
      }

      const produitAvecImages = await req.produit.reload({
        include: ["images"],
      });

      res.json(produitAvecImages);
    } catch (error) {
      console.error("❌ Erreur lors de la mise à jour du produit :", error);
      res.status(500).json({ message: "Erreur serveur" });
    }
  }
);

router.delete("/:id", authenticateToken, checkOwnership, async (req, res) => {
  try {
    await req.produit.destroy();
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
});

module.exports = router;
