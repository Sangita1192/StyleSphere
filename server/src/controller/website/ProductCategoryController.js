const ProductCategory = require("../../models/productCategory");


//all active product category
const ActiveProductCategoryWeb = async(req,res)=>{
    try{
        const response = await ProductCategory.find({status:true}).populate();
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}


//active product Category as per parent category
const ActiveProdCatasParentCategoryWeb = async(req,res)=>{
    try{
        const response = await ProductCategory.find({status:true, parent_category:req.params.parent_category}).populate();
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//active featured product Category as per parent category
const featuredCategoryAsParentCategoryWeb = async(req,res)=>{
    try{
        const response = await ProductCategory.find({status:true, parent_category:req.params.parent_category, isFeatured:true}).populate('parent_category');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success", filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

module.exports = {
    ActiveProductCategoryWeb,
    ActiveProdCatasParentCategoryWeb,
    featuredCategoryAsParentCategoryWeb
};