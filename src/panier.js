function total(articles) {
    return articles.reduce((acc, item) => acc + (item.prix * item.quantite), 0);
  }
  
  module.exports = { total };