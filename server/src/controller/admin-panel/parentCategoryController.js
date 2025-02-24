const ParentCategory = require("../../models/parentCategory");

//Parent Category controllers


//Create Parent Category
const createParentCategory = async(req,res)=>{
    try{

        const data = await new ParentCategory(req.body);  //take data user through body
        const response = await data.save();

        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        if(error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({message: 'category already exists'});
        res.status(500).json({message: 'internal server error'});
    }   
}

//View Parent Category
const viewParentCategory = async(req, res)=>{
    try{
        const response = await ParentCategory.find();
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//Update Parent Category Status
const updateParentCategoryStatus = async(req, res)=>{
    try{
        const response = await ParentCategory.updateOne(
            req.params, 
            {$set: req.body}
        );
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//Delete single Category
const deleteParentCategory = async(req, res)=>{
    try{
        const response = await ParentCategory.deleteOne(req.params)
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!!"});
    }  
}

//Delete Multiple Categories
const deleteParentCategories = async(req,res)=>{
    try{
        console.log(req.body);
       const response = await ParentCategory.deleteMany({_id: {$in: req.body.checkedCat} });       
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!!"});
    } 
}

//read-single Category

const readParentCategory = async(req, res) => {
    try{
        const response = await ParentCategory.findOne(req.params);
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//Update Single Category

const updateParentCategory = async(req,res)=>{
    try{
        const response = await ParentCategory.updateOne(req.params,
            {$set: req.body}
        )
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//Active Categories

const ActiveParentCategory = async(req,res)=>{
    try{
        const response = await ParentCategory.find({status: true});
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}



module.exports = {
    createParentCategory,
    viewParentCategory,
    updateParentCategoryStatus,
    deleteParentCategory,
    deleteParentCategories,
    readParentCategory,
    updateParentCategory,
    ActiveParentCategory
};