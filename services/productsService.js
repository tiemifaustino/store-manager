const Joi = require('joi');
const { runSchema } = require('./validators');
const productsModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBodyAdd: runSchema(Joi.object({
    name: Joi.string().min(5).required().max(100),
  })),

  checkIfExists: async (id) => {
    const exists = await productsModel.exists(id);
    if (!exists) NotFoundError('Product not found');
  },

  get: async () => {
    const products = await productsModel.get();
    return products;
  },

  getById: async (idProduct) => {
    const item = await productsModel.getById(idProduct);
    return item;
  },

  add: async (data) => {
    const id = await productsModel.add(data);
    return id;
  },
};

module.exports = productsService;