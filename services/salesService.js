const Joi = require('joi');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');
const salesModel = require('../models/salesModel');
const salesProductsModel = require('../models/salesProductsModel');

const salesService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.array().items(
    Joi.object({
      productId: Joi.number().required().positive().integer(),
      quantity: Joi.number().min(1).required().integer(),
    }),
  )),

  checkIfExists: async (id) => {
    const exists = await salesModel.exists(id);
    if (!exists) return NotFoundError('Sale not found');
  },

  list: async () => {
    const sales = await salesProductsModel.listAllSales();
    return sales;
  },

  listById: async (id) => {
    const sales = await salesProductsModel.listSalesById(id);
    return sales;
  },

  // getById: async (id) => {
  //   const item = await salesProductsModel.getById(id);
  //   return item;
  // },

  add: async (data) => {
    // adiciona a venda na tabela 'sales' e retorna o id da venda
    const id = await salesModel.add();
    // adiciona na tabela 'sales_products' passando o id da venda e os dados dos produtos
    await salesProductsModel.bulkAddBySales(id, data);
    return id;
  },

  edit: async (id, changes) => {
    const items = changes.map((change) => salesProductsModel.edit(id, change));
    await Promise.all(items);
    // await salesProductsModel.edit(id, changes);
  },

  remove: async (id) => {
    await salesModel.remove(id);
  },
};

module.exports = salesService;
