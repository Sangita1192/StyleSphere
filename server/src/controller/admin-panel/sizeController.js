const SizeModel = require("../../models/size");


//create size controller
const createSize = async(req,res)=>{
    try{
        const data = await new SizeModel(req.body);
        const response = await data.save();
        res.status(200).json({message: "success", data:response});

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//view size controller

const viewSizes = async(req, res)=>{
    try{
        const response = await SizeModel.find();
        res.status(200).json({message:'success', data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

//status update controller

const  updateSizeStatus = async(req,res)=>{
    try{
        const response = await SizeModel.updateOne(req.params,
            {$set: req.body}
        );
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//delete single Size

const deleteSize = async(req,res)=>{
    try{
        const response = await SizeModel.deleteOne(req.params);
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//Delete multiple Sizes
const deleteMultipleSizes = async(req,res)=>{
    try{
        const response = await SizeModel.deleteMany({_id: {$in: req.body.checkedSize}})
        res.status(200).json({message:"success", data:response});
    }
    catch{
        console.log(error);
        res.status(500).json({message:"internal server error!!"});
    }
}

//read-single-size

const viewSize = async(req,res)=>{
    try{
        const response = await SizeModel.findOne(req.params);
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!!"});
    }
}

//Update Size Category

const updateSize = async(req,res)=>{
    try{
        const response = await SizeModel.updateOne(req.params,
            {$set: req.body}
        );
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//Active Size Category
const ActiveSizes = async(req,res)=>{
    try{
        const response = await SizeModel.find({status: true});
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

module.exports = {
    createSize,
    viewSizes,
    updateSizeStatus,
    deleteSize,
    deleteMultipleSizes,
    viewSize,
    updateSize,
    ActiveSizes
    
};