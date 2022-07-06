const { Router } = require('express');
const productsController = require('../controllers/productsController');

const productsRoute = Router();

productsRoute.get('/', productsController.list);
productsRoute.get('/:id', productsController.getById);
productsRoute.post('/', productsController.add);
productsRoute.put('/:id', productsController.edit);
productsRoute.delete('/:id', productsController.remove);

module.exports = productsRoute;