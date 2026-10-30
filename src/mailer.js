function envoyerEmail(destinataire, message) {
    throw new Error('SMTP non configuré');
  }
  
  module.exports = { envoyerEmail };