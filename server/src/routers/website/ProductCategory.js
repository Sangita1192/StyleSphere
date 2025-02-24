const express = require('express');
const { ActiveProductCategoryWeb, ActiveProdCatasParentCategoryWeb, featuredCategoryAsParentCategoryWeb } = require('../../controller/controllers');

const ProductCategoryRouterWeb = express.Router();

ProductCategoryRouterWeb.get('/active-products-categories', ActiveProductCategoryWeb);
ProductCategoryRouterWeb.get('/read-product-category-by-parent/:parent_category', ActiveProdCatasParentCategoryWeb);
ProductCategoryRouterWeb.get('/read-featured-category-by-parent/:parent_category',featuredCategoryAsParentCategoryWeb)

module.exports = {
    ProductCategoryRouterWeb
};