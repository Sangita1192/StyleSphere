const express = require('express');
const { createCart, readCartforUser, updateCartItemQty, deleteCartItem, deleteCartItems } = require('../../controller/controllers');

const CartRouter = express.Router();

CartRouter.post('/create-cart', createCart);
CartRouter.get('/read-cart/:user', readCartforUser);
CartRouter.put('/update-quantity/:_id', updateCartItemQty);
CartRouter.delete('/delete-cartitem/:_id', deleteCartItem);
CartRouter.put('/delete-cartitems/:id',deleteCartItems);


module.exports = {
    CartRouter
}