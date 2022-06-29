const productsService = require('../services/productsService');

const productsController = {
  listProducts: async (req, res) => {
    const products = await productsService.list();
    res.json(products);
  },
};

module.exports = productsController;