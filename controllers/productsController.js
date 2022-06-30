const productsService = require('../services/productsService');

const productsController = {
  getAll: async (_req, res) => {
    const products = await productsService.getAllProducts();
    res.status(200).json(products);
  },

  getById: async (req, res) => {
    // valida o id
    const { id } = await productsService.validateParamsId(req.params);
    // verifica se existe no banco
    await productsService.checkIfExists(id);
    // pega o dado
    const item = await productsService.getProductById(id);
    // responde
    res.status(200).json(item);
  },
};

module.exports = productsController;