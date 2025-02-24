const ProductCategory = require("../../models/productCategory");

//create product category controller
const createProductCategory = async(req, res)=>{
    try{
        const data = req.body;
        if(req.files){
            if(req.files.thumbnail)  data.thumbnail = req.files.thumbnail[0].filename;           
        }
        const savedData = new ProductCategory(data);
        const response = await savedData.save();
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: 'internal server error'})
    }
}

//read-view all products

const viewProductCategory = async(req, res)=>{
    try{
        const response = await ProductCategory.find().populate('parent_category');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success",filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//update status

const updateProductStatus = async(req,res)=>{
    try{
        const response = await ProductCategory.updateOne(
            req.params,
            {$set: req.body}
        );
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

//update isFeatured status

const updateProductIsFeaturedStatus = async(req,res)=>{
    try{
        console.log(req.body);
        const response = await ProductCategory.updateOne(
            req.params,
            {$set: req.body}
        );
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}


//delete Single Product controller

const deleteProduct = async(req,res)=>{
    try{
        const response = await ProductCategory.deleteOne(req.params);
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:'internal server error'});
    }
}

//delete multiple Categories

const deleteProductCategories = async(req, res)=>{
    try{
        const response = await ProductCategory.deleteMany({_id: {$in: req.body.checkedProduct}});
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!!"});
    }
}

//read Single product category

const readProductCategory = async(req,res)=>{
    try{
        const response = await ProductCategory.findOne(req.params);
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success",filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//update product category

const updateProductCategory = async(req,res)=>{
    try{
        const data = req.body;
        if(req.files){
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }
        const response = await ProductCategory.updateOne(req.params,
            {$set: data}
        )
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error!!"});
    }
}

//active product category
const ActiveProductCategory = async(req,res)=>{
    try{
        const response = await ProductCategory.find({status: true});
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

//read product category as per parent-category

const productCategoryByparentCategory = async(req,res)=>{
    try{
        const response = await ProductCategory.find(req.params).populate('parent_category');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success", filePath, data:response});
        
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}

module.exports = {
    createProductCategory,
    viewProductCategory,
    updateProductStatus,
    deleteProduct,
    deleteProductCategories,
    readProductCategory,
    updateProductCategory,
    ActiveProductCategory,
    productCategoryByparentCategory,
    updateProductIsFeaturedStatus
}