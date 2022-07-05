const salesService = require('../services/salesService');
const productsService = require('../services/productsService');

const salesController = {
  add: async (req, res) => {
    const data = await salesService.validateBodyAdd(req.body);
    // forma um array com os ids dos produtos
    const products = data.map((item) => item.productId);
    // verifica se os ids são existentes
    await productsService.checkIfExistsByArrayOfId(products);
    // adiciona a venda na tabela 'sales' e passa os dados (productId e quantity) como argumento
    // retorna o id da venda
    const id = await salesService.add(data);
    res.status(201).json({
      id,
      itemsSold: data,
    });
  },
};

module.exports = salesController;