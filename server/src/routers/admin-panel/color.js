const express = require('express');
const { createColor, viewColorCategories, updateColorStatus, deleteColor, deleteColors, viewColor, updateColor, ActiveColors } = require('../../controller/controllers');

const colorRouter = express.Router();

colorRouter.post('/create-color', createColor);
colorRouter.get('/view-colors', viewColorCategories);
colorRouter.put('/update-status/:_id', updateColorStatus);
colorRouter.delete('/delete-color/:_id', deleteColor);
colorRouter.put('/delete-colors', deleteColors);
colorRouter.get('/view-color/:_id', viewColor);
colorRouter.put('/update-color/:_id', updateColor);
colorRouter.get('/active-colors', ActiveColors);


module.exports = colorRouter;