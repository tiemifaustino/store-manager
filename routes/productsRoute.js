const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.getAll);
productsRoute.get('/:id', productsController.getById);

module.exports = productsRoute;