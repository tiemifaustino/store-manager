const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.listProducts);
// productsRoute.get('/:id', productsController.getProducts);

module.exports = productsRoute;