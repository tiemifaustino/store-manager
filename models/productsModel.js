const db = require('./connection');

const productsModel = {
  getAllProducts: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [items] = await db.query(sql);
    return items;
  },

  getProductById: async (idProduct) => {
    const sql = `
      SELECT * FROM StoreManager.products
      WHERE id=?
    `;
    const [[item]] = await db.query(sql, [idProduct]);
    return item;
  },
};

module.exports = productsModel;