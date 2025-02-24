const express = require('express');
const { readOrderHistory } = require('../../controller/controllers');

const OrderRouterWeb = express.Router();

OrderRouterWeb.get('/read-orderhistory/:user', readOrderHistory)

module.exports = OrderRouterWeb;