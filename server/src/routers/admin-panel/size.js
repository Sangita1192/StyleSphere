const express = require('express');
const { createSize, viewSizes, updateSizeStatus, deleteSize, deleteMultipleSizes, viewSize, updateSize, ActiveSizes } = require('../../controller/controllers');
const multer = require('multer');

const sizeRouter = express.Router();
sizeRouter.use(multer().none());

sizeRouter.post('/create-size', createSize);
sizeRouter.get('/view-sizes', viewSizes);
sizeRouter.put('/update-status/:_id', updateSizeStatus);
sizeRouter.delete('/delete-size/:_id', deleteSize);
sizeRouter.put('/delete-sizes', deleteMultipleSizes);
sizeRouter.get('/view-size/:_id', viewSize);
sizeRouter.put('/update-size/:_id', updateSize);
sizeRouter.get('/active-sizes',ActiveSizes)

module.exports = sizeRouter;

