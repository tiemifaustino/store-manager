const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

salesRoute.get('/', salesController.list);
salesRoute.get('/:id', salesController.listById);
salesRoute.post('/', salesController.add);
salesRoute.delete('/:id', salesController.remove);

module.exports = salesRoute;