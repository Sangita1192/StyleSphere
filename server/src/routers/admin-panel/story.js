const express = require('express');
const { createStory, readStories, updateStoryStatus, deleteStory, deleteStories, readStory, updateStory } = require('../../controller/controllers');
const storageUpload = require('../../middleware/multer');


const StoryRouter = express.Router();

StoryRouter.post('/create-story',storageUpload, createStory);
StoryRouter.get('/read-stories', readStories);
StoryRouter.put('/update-status/:_id', updateStoryStatus);
StoryRouter.delete('/delete-story/:_id', deleteStory);
StoryRouter.put('/delete-stories', deleteStories);
StoryRouter.get('/read-story/:_id', readStory);
StoryRouter.put('/update-story/:_id',storageUpload, updateStory);

module.exports = StoryRouter;