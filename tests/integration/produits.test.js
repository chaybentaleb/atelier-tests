const request = require('supertest');
const app = require('../../src/app');
const { pool, initDb } = require('../../src/db');

describe('Integration - /produits', () => {
  beforeAll(async () => {
    await initDb();
  });

  beforeEach(async () => {
    await pool.query('TRUNCATE TABLE produits RESTART IDENTITY;');
  });

  afterAll(async () => {
    await pool.end();
  });

  test('POST /produits - crée un produit', async () => {
    const res = await request(app)
      .post('/produits')
      .send({ nom: 'Clavier', prix: 49.99 });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nom).toBe('Clavier');
    expect(parseFloat(res.body.prix)).toBe(49.99);
  });

  test('GET /produits - renvoie la liste des produits', async () => {
    await pool.query("INSERT INTO produits (nom, prix) VALUES ('Souris', 19.99)");

    const res = await request(app).get('/produits');

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
    expect(res.body[0].nom).toBe('Souris');
  });

  test('POST /produits - rejette un produit sans nom', async () => {
    const res = await request(app)
      .post('/produits')
      .send({ prix: 10 });

    expect(res.statusCode).toBe(400);
  });
});