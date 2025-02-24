const express = require('express');
const { readBannersWeb } = require('../../controller/controllers');

const BannerRouterWeb = express.Router();

BannerRouterWeb.get('/read-banner', readBannersWeb);

module.exports = BannerRouterWeb