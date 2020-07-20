const express = require('express');
const router = express.Router();
const ordersController = require('../controllers/orders.controller')


/* GET orders by ID */
router.get('/orders/:id', ordersController.getById);


/*POST create new order */
router.post('/orders/new',ordersController.createOrder)

module.exports = router;