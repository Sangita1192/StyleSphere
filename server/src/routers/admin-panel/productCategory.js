const express = require('express');
const multer = require('multer');
const { createProductCategory, viewProductCategory, updateProductStatus, deleteProduct,deleteProductCategories, readProductCategory, updateProductCategory, ActiveProductCategory, productCategoryByparentCategory, updateProductIsFeaturedStatus } = require('../../controller/controllers');
const multerUpload = require('../../middleware/multer');
const productCategoryRouter = express.Router();

productCategoryRouter.post('/create-category', multerUpload ,createProductCategory);
productCategoryRouter.get('/view-categories', viewProductCategory);
productCategoryRouter.put('/update-status/:_id',updateProductStatus );
productCategoryRouter.put('/update-featured-status/:_id',updateProductIsFeaturedStatus );
productCategoryRouter.delete('/delete-product/:_id', deleteProduct);
productCategoryRouter.put('/delete-product-categories', deleteProductCategories);
productCategoryRouter.get('/view-product-category/:_id', readProductCategory);
productCategoryRouter.put('/update-product-category/:_id',multerUpload, updateProductCategory);
productCategoryRouter.get('/active-product-categories', ActiveProductCategory);
productCategoryRouter.get('/read-product-of-parent-category/:parent_category', productCategoryByparentCategory);

module.exports = productCategoryRouter;