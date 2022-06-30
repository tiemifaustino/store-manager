const Joi = require('joi');
const { runSchema } = require('./validators');
const productModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  checkIfExists: async (id) => {
    const exists = await productModel.exists(id);
    if (!exists) NotFoundError('Product not found');
  },

  getAllProducts: async () => {
    const products = await productModel.getAllProducts();
    return products;
  },

  getProductById: async (idProduct) => {
    const item = await productModel.getProductById(idProduct);
    return item;
  },
};

module.exports = productsService;