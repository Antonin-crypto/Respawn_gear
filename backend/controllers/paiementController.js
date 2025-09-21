const {
  Commande,
  Paiement,
  StatutCommandeHistorique,
} = require("../models/associations");

// Fonction de paiement
exports.payCommande = async (req, res) => {
  try {
    const { commandeId } = req.params;
    const { modePaiement, montant } = req.body;

    const commande = await Commande.findByPk(commandeId);
    if (!commande)
      return res.status(404).json({ error: "Commande non trouvée" });

    // Création du paiement
    const newPaiement = await Paiement.create({
      modePaiement,
      statutPaiement: "success",
      datePaiement: new Date(),
      montant,
      commandeId: commande.id,
    });

    // Mettre à jour la commande
    commande.Statut = "paid";
    await commande.save();

    // Historique des statuts
    await StatutCommandeHistorique.create({
      statut: "paid",
      dateStatut: new Date(),
      commandeId: commande.id,
    });

    res.json({ message: "Paiement validé", paiement: newPaiement, commande });
  } catch (error) {
    console.error("Erreur payCommande :", error);
    res.status(500).json({ error: "Erreur lors du paiement" });
  }
};
