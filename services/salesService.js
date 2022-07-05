const Joi = require('joi');
const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');
const { runSchema } = require('./validators');

const salesService = {
  validateBodyAdd: runSchema(Joi.array().items(
    Joi.object({
      productId: Joi.number().required().positive().integer(),
      quantity: Joi.number().min(1).required().integer(),
    }),
  )),

  add: async (data) => {
    // adiciona a venda na tabela 'sales' e retorna o id da venda
    const id = await salesModel.add();
    // adiciona na tabela 'sales_products' passando o id da venda e os dados dos produtos
    await salesProductsModel.bulkAddBySales(id, data);
    // await Promise.all(data.map((item) => salesProductsModel.bulkAddBySales(id, item)));
    return id;
  },

  // get: async (id) => {
  //   const items = await Promise.all([
  //     salesModel.get(id);
  //     salesProductsModel.
  //   ]);
  //   return items;
  // },
};

module.exports = salesService;
