const express = require('express');
const { pool } = require('./db');

const app = express();
app.use(express.json());

app.get('/produits', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM produits');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

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