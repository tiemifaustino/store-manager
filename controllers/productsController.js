const productsService = require('../services/productsService');

const productsController = {
  list: async (_req, res) => {
    const products = await productsService.list();
    res.status(200).json(products);
  },

  search: async (req, res) => {
    const { q } = req.query;
    const productsFound = await productsService.search(q);
    res.status(200).json(productsFound);
  },

  getById: async (req, res) => {
    const { id } = await productsService.validateParamsId(req.params); // valida o id
    await productsService.checkIfExists(id); // verifica se existe no banco
    const item = await productsService.getById(id); // pega o dado
    res.status(200).json(item); // responde
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

  remove: async (req, res) => {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkIfExists(id);
    await productsService.remove(id);
    res.sendStatus(204);
  },
};

module.exports = productsController;