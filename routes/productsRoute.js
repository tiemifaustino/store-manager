const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.getAllProducts);
productsRoute.get('/:id', productsController.getProductById);

module.exports = productsRoute;