const express = require('express');
const { createCheckout, updatePaymentStatus } = require('../../controller/controllers');

const PaymentRouter = express.Router();

PaymentRouter.post('/create-checkout', createCheckout);
PaymentRouter.put('/update-payment-status/:id', updatePaymentStatus);


module.exports = PaymentRouter;