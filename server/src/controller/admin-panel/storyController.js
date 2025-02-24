const Story = require("../../models/story");

//Create Story Controller

const createStory = async(req,res)=>{
    try{
        const data = req.body;
        if(req.files){
            if(req.files.story_img) data.story_img = req.files.story_img[0].filename;
            if(req.files.banner) data.banner = req.files.banner[0].filename;
        }
        const dataToSave = new Story(data);
        const response = await dataToSave.save();
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//read all story

const readStories = async(req,res)=>{
    try{
        const response = await Story.find();
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success",filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//update Status of Story
const updateStoryStatus = async(req,res)=>{
    try{
        const response = await Story.updateOne(req.params,
            {$set:req.body}
        );
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server errror"});
    }
}

//deleteStory
const deleteStory = async(req,res)=>{
    try{
        const response = await Story.deleteOne(req.params);
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//delete Multiple stories
const deleteStories = async(req,res)=>{
    try{
        const response = await Story.deleteMany({_id: {$in: req.body.checkedStory}});
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//get single story for edit
const readStory = async(req,res)=>{
    try{
        const response = await Story.findOne(req.params);
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success",filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
} 


//update Story
const updateStory = async(req,res)=>{
    try{
        const data = req.body;
        if(req.files){
            if(req.files.story_img) data.story_img = req.files.story_img[0].filename;
            if(req.files.banner) data.banner = req.files.banner[0].filename;
        }
        const response = await Story.updateOne(req.params,
            {$set: data}
        );
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"interna server error"});
    }
}


module.exports = {
    createStory,
    readStories,
    updateStoryStatus,
    deleteStory,
    deleteStories,
    readStory,
    updateStory
}