const productModel = require('../models/productsModel');

const productsService = {
  getAllProducts: async () => {
    const products = await productModel.getAllProducts();
    return products;
  },

  getProductById: async (idProduct) => {
    const item = await productModel.getProductById(idProduct);
    return item;
  },
};

module.exports = productsService;