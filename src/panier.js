function total(articles) {
    const aUnPrixNegatif = articles.some(item => item.prix < 0);
    if (aUnPrixNegatif) {
      throw new Error('Prix négatif interdit');
    }
    return articles.reduce((acc, item) => acc + (item.prix * item.quantite), 0);
  }
  
  module.exports = { total };