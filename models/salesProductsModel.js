const db = require('./connection');

const salesProductsModel = {
  bulkAddBySales: async (saleId, items) => {
    const sql = `
      INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity)
      VALUES ?
    `;
    const map = items.map((item) => [saleId, item.productId, item.quantity]);
    await db.query(sql, [map]);
  },
};

module.exports = salesProductsModel;