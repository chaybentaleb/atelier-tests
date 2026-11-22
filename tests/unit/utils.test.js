const request = require('supertest');
const app = require('../../src/app');
const { genererToken, classer } = require('../../src/utils');

describe('classer()', () => {
  test.each([
    [20, 'parfait'],
    [12, 'admis'],
    [10, 'admis'],
    [9, 'refusé'],
  ])('note %i donne %s', (note, attendu) => {
    expect(classer(note)).toBe(attendu);
  });
});

describe('genererToken()', () => {
  test('retourne 32 caractÃ¨res hexadÃ©cimaux', () => {
    expect(genererToken()).toMatch(/^[0-9a-f]{32}$/);
  });

  test('deux appels donnent deux jetons diffÃ©rents', () => {
    expect(genererToken()).not.toBe(genererToken());
  });
  test('ne divulgue pas la technologie du serveur', async () => {
    const res = await request(app).get('/users/1');
    expect(res.headers['x-powered-by']).toBeUndefined();
  });
});
