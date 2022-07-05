const db = require('./connection');

const salesModel = {
  add: async () => {
    const sql = `
      INSERT INTO StoreManager.sales (date)
      VALUES (NOW())
    `;
    const [{ insertId }] = await db.query(sql);
    return insertId;
  },
};

module.exports = salesModel;