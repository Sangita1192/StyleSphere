const express = require('express');
const { ActiveProductByParentCatWeb, SearchProducts, AllProductWeb, readProductWeb, mostViewedProducts, incrementViewsCountOfProduct, newlyArrivedProducts } = require('../../controller/controllers');

const ProductRouterWeb = express.Router();

ProductRouterWeb.get('/active-products/:parent_category', ActiveProductByParentCatWeb);
ProductRouterWeb.post('/search-products/:key',  SearchProducts);
ProductRouterWeb.get('/all-products', AllProductWeb);
ProductRouterWeb.get('/read-product/:_id', readProductWeb);
ProductRouterWeb.get('/most-viewed-products', mostViewedProducts);
ProductRouterWeb.get('/view-count/:_id', incrementViewsCountOfProduct);
ProductRouterWeb.get('/newly-arrived', newlyArrivedProducts);

module.exports = {
    ProductRouterWeb
}