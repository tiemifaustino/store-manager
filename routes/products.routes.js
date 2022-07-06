const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.get);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', productsController.add);

module.exports = productsRoute;