const { validerCommande } = require('../../src/commande');
const mailer = require('../../src/mailer');

jest.mock('../../src/mailer');

describe('Commande', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('valide la commande et envoie un e-mail', () => {
    mailer.envoyerEmail.mockResolvedValue();
    const client = { email: 'test@example.com' };
    const articles = [{ prix: 10, quantite: 2 }];

    const resultat = validerCommande(client, articles);

    expect(resultat.statut).toBe('validée');
    expect(resultat.total).toBe(20);
    expect(mailer.envoyerEmail).toHaveBeenCalledTimes(1);
    expect(mailer.envoyerEmail).toHaveBeenCalledWith(
      'test@example.com',
      'Votre commande de 20€ est validée'
    );
  });

  test('refuse un panier vide', () => {
    const client = { email: 'test@example.com' };
    expect(() => validerCommande(client, [])).toThrow('Panier vide');
  });
});