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

  list: async () => {
    const sql = 'SELECT * FROM StoreManager.products';
    const [items] = await db.query(sql);
    return items;
  },

  listByArrayOfId: async (arrayOfId) => {
    const sql = `
      SELECT * FROM StoreManager.products
      WHERE id IN (?);
    `;
    const [items] = await db.query(sql, [arrayOfId]);
    return items;
  },

  getById: async (idProduct) => {
    const sql = `
      SELECT * FROM StoreManager.products
      WHERE id=?
    `;
    const [[item]] = await db.query(sql, [idProduct]);
    return item;
  },

  add: async (data) => {
    const sql = `
      INSERT INTO StoreManager.products (name)
      VALUES (?)
    `;
    const [{ insertId }] = await db.query(sql, [data.name]);
    return insertId;
  },
};

module.exports = productsModel;