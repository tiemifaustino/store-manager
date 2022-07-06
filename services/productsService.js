const Joi = require('joi');
const { runSchema } = require('./validators');
const NotFoundError = require('../errors/NotFoundError');
const productsModel = require('../models/productsModel');

const productsService = {
  validateParamsId: runSchema(Joi.object({
    id: Joi.number().required().positive().integer(),
  })),

  validateBody: runSchema(Joi.object({
    name: Joi.string().min(5).required().max(100),
  })),

  checkIfExists: async (id) => {
    const exists = await productsModel.exists(id);
    if (!exists) return NotFoundError('Product not found');
  },

  checkIfExistsByArrayOfId: async (arrayOfId) => {
    // retorna os itens dos respectivos ids do 'arrayOfId'
    const items = await productsModel.listByArrayOfId(arrayOfId);

    if (!items.length || items.length !== arrayOfId.length) {
      return NotFoundError('Product not found');
    }
    return true;
  },

  list: async () => {
    const products = await productsModel.list();
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

  edit: async (id, changes) => {
    await productsModel.edit(id, changes);
  },

  remove: async (idProduct) => {
    await productsModel.remove(idProduct);
  },
};

module.exports = productsService;