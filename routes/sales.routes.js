const { Router } = require('express');
const salesController = require('../controllers/salesController');

const salesRoute = Router();

// salesRoute.get('/', salesController.list);
// salesRoute.get('/:id', salesController.getById);
salesRoute.post('/', salesController.add);

module.exports = salesRoute;