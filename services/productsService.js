const Joi = require('joi');
const productModel = require('../models/productsModel');
const NotFoundError = require('../errors/NotFoundError');

const productsService = {
  validateParamsId: (data) => {
  const schema = Joi.object({
    id: Joi.number().required().positive().integer(),
  });
  const { error, value } = schema.validate(data);
    if (error) {
      error.message = error.details[0].message;
      throw error;
    }
    return value;
  },

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