const db = require('./connection');

const salesModel = {
  // list: async () => {
  //   const sql = 'SELECT * FROM StoreManager.sales';
  //   const [items] = await db.query(sql);
  //   return items;
  // },

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