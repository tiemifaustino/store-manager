const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const salesController = {
  list: async (_req, res) => {
    const sales = await salesService.list();
    res.status(200).json(sales);
  },

  listById: async (req, res) => {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkIfExists(id);
    const sale = await salesService.listById(id);
    res.status(200).json(sale);
  },

  add: async (req, res) => {
    const data = await salesService.validateBodyAdd(req.body);
    // forma um array com os ids dos produtos
    const products = data.map((item) => item.productId);
    // verifica se todos os ids são existentes
    await productsService.checkIfExistsByArrayOfId(products);
    // adiciona a venda na tabela 'sales' e passa os dados (productId e quantity) como argumento
    // retorna o id da venda
    const id = await salesService.add(data);
    res.status(201).json({
      id,
      itemsSold: data,
    });
  },

  remove: async (req, res) => {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkIfExists(id);
    await salesService.remove(id);
    res.sendStatus(204);
  },
};

module.exports = salesController;