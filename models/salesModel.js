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

  // get: async (id) => {
  //   const sql = `
  //     SELECT * FROM StoreManager.sales_products
  //     WHERE sale_id=?
  //   `;
  //   const [[item]] = await db.query(sql, [id]);
  //   return item;
  // },
};

module.exports = salesModel;