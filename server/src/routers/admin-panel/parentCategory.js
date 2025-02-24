//it will handle all parent-category routes of admin-panel

const express = require('express');

const multer = require('multer'); 
const { createParentCategory, viewParentCategory, updateParentCategoryStatus, deleteParentCategory, deleteParentCategories, readParentCategory, updateParentCategory, ActiveParentCategory } = require('../../controller/controllers');
const parentCategoryRouter = express.Router();

//To read form data add multer as middleware
parentCategoryRouter.use(multer().none());     

parentCategoryRouter.post('/create-category', createParentCategory);
parentCategoryRouter.get('/view-category', viewParentCategory);
parentCategoryRouter.put('/update-status/:_id', updateParentCategoryStatus);
parentCategoryRouter.delete('/delete-category/:_id',deleteParentCategory );

parentCategoryRouter.put('/delete-categories',deleteParentCategories); //put method has used because delete method can't be used when you want to delet multiple categories
parentCategoryRouter.get('/read-category/:_id', readParentCategory);
parentCategoryRouter.put('/update-category/:_id', updateParentCategory);
parentCategoryRouter.get('/active-categories', ActiveParentCategory);

module.exports = parentCategoryRouter;