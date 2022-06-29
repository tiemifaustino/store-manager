const productModel = require('../models/productsModel');

const productsService = {
  list: async () => {
    const products = await productModel.list();
    return products;
  },
};

module.exports = productsService;