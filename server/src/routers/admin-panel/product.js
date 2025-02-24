const express = require('express');
const { createProduct, readProducts, updateStatus, deleteOneProduct, deleteProducts, readProduct, updateProduct } = require('../../controller/controllers');
const storageUpload = require('../../middleware/multer');
const Product = require('../../models/product');

const ProductRouter = express.Router();

ProductRouter.post('/create-product',storageUpload, createProduct);
ProductRouter.get('/read-products', readProducts);
ProductRouter.put('/update-status/:_id', updateStatus);
ProductRouter.delete('/delete-product/:_id', deleteOneProduct);
ProductRouter.put('/delete-products', deleteProducts);
ProductRouter.get('/read-product/:_id', readProduct);
ProductRouter.put('/update-product/:_id',updateProduct);


module.exports = ProductRouter;