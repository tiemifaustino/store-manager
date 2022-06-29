const db = require('./connection');

const productsModel = {
  list: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [items] = await db.query(sql);
    return items;
  },
};

module.exports = productsModel;