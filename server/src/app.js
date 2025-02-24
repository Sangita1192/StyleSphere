const express = require('express');
const { adminPanelRouter, websiteRouter, appRouter } = require('./routers/routes');

const allRoutes = express.Router();

allRoutes.use('/admin-panel', adminPanelRouter);
allRoutes.use('/website', websiteRouter);
allRoutes.use('/apps', appRouter);

module.exports = allRoutes;