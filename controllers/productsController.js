const productsService = require('../services/productsService');

const productsController = {
  get: async (_req, res) => {
    const products = await productsService.get();
    res.status(200).json(products);
  },

  getById: async (req, res) => {
    // valida o id
    const { id } = await productsService.validateParamsId(req.params);
    // verifica se existe no banco
    await productsService.checkIfExists(id);
    // pega o dado
    const item = await productsService.getById(id);
    // responde
    res.status(200).json(item);
  },

  add: async (req, res) => {
    const data = await productsService.validateBodyAdd(req.body);
    const id = await productsService.add(data);
    const product = await productsService.getById(id);
    res.status(201).json(product);
  },
};

module.exports = productsController;