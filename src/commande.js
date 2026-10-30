const mailer = require('./mailer');
const panier = require('./panier');

function validerCommande(client, articles) {
  if (!articles || articles.length === 0) {
    throw new Error('Panier vide');
  }
  const montantTotal = panier.total(articles);
  mailer.envoyerEmail(client.email, `Votre commande de ${montantTotal}€ est validée`);
  return { statut: 'validée', total: montantTotal };
}

module.exports = { validerCommande };