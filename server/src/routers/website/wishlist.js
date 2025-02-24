const express = require('express');
const { createWishlist, wishlistsForUser, deleteProductFromWishlist } = require('../../controller/controllers');

const WishListRouter = express.Router();

WishListRouter.post('/create-wishlist',createWishlist);
WishListRouter.get('/read-wishlist/:user',wishlistsForUser);
WishListRouter.delete('/remove-from-wishlist',deleteProductFromWishlist);

module.exports = WishListRouter;