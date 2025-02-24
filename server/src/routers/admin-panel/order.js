const express = require('express');
const { readOrders } = require('../../controller/controllers');

const OrderRouter = express.Router();

OrderRouter.get('/read-orders', readOrders);

module.exports = OrderRouter;