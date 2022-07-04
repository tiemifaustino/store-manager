const Joi = require('joi');
const { runSchema } = require('./validators');
const productModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().required().max(100),
  })),

  checkIfExists: async (id) => {
    const exists = await productModel.exists(id);
    if (!exists) NotFoundError('Product not found');
  },

  get: async () => {
    const products = await productModel.get();
    return products;
  },

  getById: async (idProduct) => {
    const item = await productModel.getById(idProduct);
    return item;
  },

  add: async (data) => {
    const id = await productModel.add(data);
    return id;
  },
};

module.exports = productsService;