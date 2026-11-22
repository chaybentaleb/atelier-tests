const express = require('express');
const { pool } = require('./db');

const app = express();
app.disable('x-powered-by');
app.use(express.json());

// GET /produits - Liste tous les produits
app.get('/produits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produits');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /produits/:id - Récupération par ID avec validation Regex (Protection injection SQL)
app.get('/produits/:id', async (req, res) => {
  const idParam = req.params.id;

  // Si l'ID contient autre chose que des chiffres -> 400 Bad Request
  if (!/^\d+$/.test(idParam)) {
    return res.status(400).json({ erreur: "id invalide" });
  }

  try {
    const result = await pool.query('SELECT * FROM produits WHERE id = $1', [idParam]);
    if (result.rows.length === 0) {
      return res.status(404).json({ erreur: "produit non trouvé" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /produits - Créer un produit
app.post('/produits', async (req, res) => {
  const { nom, prix } = req.body;
  if (!nom || prix === undefined || prix < 0) {
    return res.status(400).json({ error: 'Données invalides' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO produits (nom, prix) VALUES ($1, $2) RETURNING *',
      [nom, prix]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;