//it will handle all the routes of router and connect to app.js, which further connect to index.js
const express = require('express');
const parentCategoryRouter = require('./admin-panel/parentCategory');
const sizeRouter = require('./admin-panel/size');
const productCategoryRouter = require('./admin-panel/productCategory');
const { AdminRouter } = require('./admin-panel/admin');
const colorRouter = require('./admin-panel/color');
const { UserRouter } = require('./website/user');
const { ParentCategoryRouterWeb } = require('./website/ParentCategory');
const { ProductCategoryRouterWeb } = require('./website/ProductCategory');
const { ProductRouterWeb } = require('./website/product');
const ProductRouter = require('./admin-panel/product');
const { CartRouter } = require('./website/cart');
const PaymentRouter = require('./website/payment');
const StoryRouter = require('./admin-panel/story');
const SliderRouter = require('./admin-panel/slider');
const OrderRouter = require('./admin-panel/order');
const WishListRouter = require('./website/wishlist');
const OrderRouterWeb = require('./website/orderHistory');
const BannerRouter = require('./admin-panel/banner');
const BannerRouterWeb = require('./website/banner');
const SearchHistoryWeb = require('./website/searchHistory');


const adminPanelRouter = express.Router();  //hadnle all the routes of admin-panel
const websiteRouter = express.Router();  //hadnle all the routes of websites
const appRouter = express.Router();  //handle all the routes of Apps



adminPanelRouter.use('/parent-category', parentCategoryRouter);
adminPanelRouter.use('/product-category', productCategoryRouter)
adminPanelRouter.use('/size', sizeRouter);
adminPanelRouter.use('/admin', AdminRouter);
adminPanelRouter.use('/color', colorRouter);
adminPanelRouter.use('/products', ProductRouter)
adminPanelRouter.use('/story', StoryRouter);
adminPanelRouter.use('/slider', SliderRouter);
adminPanelRouter.use('/order', OrderRouter);
adminPanelRouter.use('/banner', BannerRouter);


//website Routers

websiteRouter.use('/users', UserRouter);
websiteRouter.use('/parent-categories', ParentCategoryRouterWeb)
websiteRouter.use('/product-categories', ProductCategoryRouterWeb);
websiteRouter.use('/products', ProductRouterWeb);
websiteRouter.use('/cart', CartRouter);
websiteRouter.use('/wishlist', WishListRouter);
websiteRouter.use('/payment', PaymentRouter);
websiteRouter.use('/order',OrderRouterWeb);
websiteRouter.use('/banner', BannerRouterWeb);
websiteRouter.use('/search',SearchHistoryWeb);






module.exports = {
    adminPanelRouter,
    websiteRouter,
    appRouter,     
}