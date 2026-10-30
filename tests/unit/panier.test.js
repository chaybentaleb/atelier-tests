const { total } = require('../../src/panier');

describe('Panier', () => {
  test('calcule le total d un panier normal', () => {
    const articles = [
      { prix: 10, quantite: 2 },
      { prix: 5, quantite: 3 }
    ];
    expect(total(articles)).toBe(35);
  });

  test('retourne 0 pour un panier vide', () => {
    expect(total([])).toBe(0);
  });

  test('ignore une ligne dont la quantité est 0', () => {
    const items = [{ prix: 10, quantite: 0 }, { prix: 5, quantite: 2 }];
    expect(total(items)).toBe(10);
  });
});