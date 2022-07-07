const db = require('./connection');

const salesProductsModel = {
  bulkAddBySales: async (saleId, items) => {
    const sql = `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES ?
    `;
    const map = items.map((item) => [saleId, item.productId, item.quantity]);
    const [{ affectedRows }] = await db.query(sql, [map]);
    return !!affectedRows;
  },

  listAllSales: async () => {
    const sql = `
      SELECT
        sp.sale_id AS saleId,
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM
        StoreManager.sales_products AS sp
      INNER JOIN
        StoreManager.sales AS s ON sp.sale_id = s.id
    `;
    const [items] = await db.query(sql);
    return items;
  },

  listSalesById: async (saleId) => {
    const sql = `
      SELECT
        s.date,
        sp.product_id AS productId,
        sp.quantity
      FROM
        StoreManager.sales_products AS sp
      INNER JOIN
        StoreManager.sales AS s ON sp.sale_id = s.id
      WHERE sp.sale_id = ?
    `;
    const [items] = await db.query(sql, [saleId]);
    return items;
  },

  // getById: async (id) => {
  //   const sql = `
  //     SELECT * FROM StoreManager.sales_products
  //     WHERE id = ?
  //   `;
  //   const [[item]] = await db.query(sql, [id]);
  //   return item;
  // },

  edit: async (id, change) => {
    const sql = `
      UPDATE StoreManager.sales_products
      SET quantity = ? 
      WHERE sale_id = ? AND product_id = ?
    `;
    
    await db.query(sql, [change.quantity, id, change.productId]);
  },
};

module.exports = salesProductsModel;