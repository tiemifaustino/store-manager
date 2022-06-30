const db = require('./connection');

const productsModel = {
  exists: async (id) => {
    const sql = `
      SELECT * FROM StoreManager.products
      WHERE id=?
    `;
    const [[exists]] = await db.query(sql, [id]);
    return !!exists; // !! - retorna valor booleano
  },

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