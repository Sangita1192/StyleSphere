const express = require('express');
const {ActiveParentCategoryWeb } = require('../../controller/controllers');

const ParentCategoryRouterWeb = express.Router();

ParentCategoryRouterWeb.get('/active-parent-categories', ActiveParentCategoryWeb);

module.exports = {ParentCategoryRouterWeb};