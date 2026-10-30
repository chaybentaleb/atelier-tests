const app = require('./app');
const { initDb } = require('./db');

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await initDb();
    console.log('Base de données initialisée avec succès.');
    
    app.listen(PORT, () => {
      console.log(`Serveur prêt sur http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('Erreur lors du démarrage du serveur :', err);
  }
}

startServer();