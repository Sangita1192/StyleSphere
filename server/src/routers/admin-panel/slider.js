const express = require('express');
const { createSlider, readSliders, updateSliderStatus, deleteSlider, deleteSliders, readSlider, updateSlider } = require('../../controller/controllers');
const storageUpload = require('../../middleware/multer');

const SliderRouter = express.Router();

SliderRouter.post('/create-slider',storageUpload, createSlider);
SliderRouter.get('/read-sliders', readSliders);
SliderRouter.put('/update-status/:_id', updateSliderStatus);
SliderRouter.delete('/delete-slider/:_id', deleteSlider);
SliderRouter.put('/delete-sliders', deleteSliders);
SliderRouter.get('/read-slider/:_id', readSlider);
SliderRouter.post('/update-slider/:_id',storageUpload, updateSlider);

module.exports = SliderRouter;