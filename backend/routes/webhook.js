const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const { Commande, Paiement } = require("../models/associations");

router.post(
  "/webhook-stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log("Webhook signature failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      const commandeId = paymentIntent.metadata.commandeId;

      await Paiement.update(
        { statutPaiement: "succeeded" },
        { where: { stripePaymentIntentId: paymentIntent.id } }
      );

      await Commande.update({ Statut: "payée" }, { where: { id: commandeId } });

      console.log(`Commande ${commandeId} payée !`);
    }

    res.json({ received: true });
  }
);

module.exports = router;
