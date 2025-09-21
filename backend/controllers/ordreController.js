require("dotenv").config();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const {
  Commande,
  Produit,
  Paiement,
  Adress,
  StatutCommandeHistorique,
} = require("../models/associations");

// Créer une commande
exports.createCommande = async (req, res) => {
  try {
    const { userId, produits, adresseId, montant, modePaiement } = req.body;

    //  Création de la commande
    const commande = await Commande.create({
      dateCommande: new Date(),
      Statut: "pending",
      userId,
      adresseId,
    });

    //  Ajout des produits liés
    if (produits && produits.length > 0) {
      for (const p of produits) {
        await commande.addProduit(p.id, {
          through: { quantite: p.quantite, prix: p.prix },
        });
      }
    }

    // Création d’un PaymentIntent Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: montant * 100, // en centimes
      currency: "eur",
      metadata: { commandeId: commande.id },
    });

    //  Création d’un enregistrement Paiement
    await Paiement.create({
      modePaiement,
      statutPaiement: "pending",
      datePaiement: new Date(),
      montant,
      commandeId: commande.id,
      stripePaymentIntentId: paymentIntent.id,
    });

    // Historique du statut
    await StatutCommandeHistorique.create({
      statut: "pending",
      dateStatut: new Date(),
      commandeId: commande.id,
    });

    res.status(201).json({ message: "Commande créée", commande });
  } catch (error) {
    console.error(" Erreur createCommande :", error);
    res
      .status(500)
      .json({ error: "Erreur lors de la création de la commande" });
  }
};
