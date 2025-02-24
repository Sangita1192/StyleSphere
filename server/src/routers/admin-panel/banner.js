const express = require('express');
const { createBanner, readBanners, updateIsfallback, deleteBanner, deleteBanners } = require('../../controller/controllers');
const storageUpload = require('../../middleware/multer');

const BannerRouter = express.Router();

BannerRouter.post('/create-banner',storageUpload ,createBanner);
BannerRouter.get('/read-banners',readBanners);
BannerRouter.put('/update-isfallback/:_id', updateIsfallback);
BannerRouter.delete('/delete-banner/:_id', deleteBanner);
BannerRouter.put('/delete-banners',deleteBanners);

module.exports = BannerRouter;