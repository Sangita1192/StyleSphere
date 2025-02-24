const ParentCategory = require("../../models/parentCategory");

const ActiveParentCategoryWeb = async(req,res)=>{
    try{
        const response = await ParentCategory.find({status:true});
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server errror!!"});
    }
}

module.exports = {
    ActiveParentCategoryWeb
}