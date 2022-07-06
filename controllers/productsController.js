const productsService = require('../services/productsService');

const productsController = {
  list: async (_req, res) => {
    const products = await productsService.list();
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
    const data = await productsService.validateBody(req.body);
    const id = await productsService.add(data);
    const product = await productsService.getById(id);
    res.status(201).json(product);
  },

  edit: async (req, res) => {
    // o { id } é a desestruturação do objeto req.params
    // o [{ id }, changes] é a desestruturação do retorno do Promise.all
    const [{ id }, changes] = await Promise.all([
      productsService.validateParamsId(req.params),
      productsService.validateBody(req.body),
    ]);
    await productsService.checkIfExists(id);
    await productsService.edit(id, changes);
    const item = await productsService.getById(id);
    res.status(200).json(item);
  },
};

module.exports = productsController;