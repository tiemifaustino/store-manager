const db = require('./connection');

const salesModel = {
  exists: async (id) => {
    const sql = `
      SELECT *
      FROM StoreManager.sales
      WHERE id = ?
    `;
    const [[exists]] = await db.query(sql, [id]);
    return !!exists;
  },

  add: async () => {
    const sql = `
      INSERT INTO StoreManager.sales (date)
      VALUES (NOW())
    `;
    const [{ insertId }] = await db.query(sql);
    return insertId;
  },

  remove: async (id) => {
    const sql = `
      DELETE FROM StoreManager.sales
      WHERE id = ?
    `;
    await db.query(sql, [id]);
  },
};

module.exports = salesModel;