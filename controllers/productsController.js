const productsService = require('../services/productsService');

const productsController = {
  getAllProducts: async (_req, res) => {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  },

  getProductById: async (req, res) => {
    const { id } = req.params;
    const item = await productsService.getProductById(id);
    // aplicar validações na camada de service ou na camada de middlewares
    if (!item) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json(item);
  },
};

module.exports = productsController;