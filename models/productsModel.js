const db = require('./connection');

const productsModel = {
  exists: async (id) => {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id = ?
    `;
    const [[exists]] = await db.query(sql, [id]);
    return !!exists; // !! - retorna valor booleano
  },

  search: async (name) => {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE name LIKE ?
    `;
    const [items] = await db.query(sql, [`%${name}%`]);
    return items;
  },

  list: async () => {
    const sql = `
      SELECT *
      FROM StoreManager.products
    `;
    const [items] = await db.query(sql);
    return items;
  },

  listByArrayOfId: async (arrayOfId) => {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id IN (?);
    `;
    const [items] = await db.query(sql, [arrayOfId]);
    return items;
  },

  getById: async (idProduct) => {
    const sql = `
      SELECT *
      FROM StoreManager.products
      WHERE id = ?
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

  edit: async (id, changes) => {
    const sql = `
      UPDATE StoreManager.products 
      SET ? 
      WHERE id = ?
    `;
    await db.query(sql, [changes, id]);
  },

  remove: async (id) => {
    const sql = `
      DELETE FROM StoreManager.products
      WHERE id = ?
    `;
    await db.query(sql, [id]);
  },
};

module.exports = productsModel;