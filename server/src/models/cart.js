const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    color: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colors'
    },
    size: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'productSizes'
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    quantity:
    {
        type: Number,
        default: 1
    }
});

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;


