const express = require('express');
const ColorModel = require('../../models/color');


//Create Color Controller
const createColor = async(req,res)=>{
    try{
        const data = await new ColorModel(req.body);
        const response = await data.save();
        res.status(200).json({message:"success", data:response})

    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//read all color categories

const viewColorCategories = async(req,res)=>{
    try{
        const response = await ColorModel.find();
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//update color status

const updateColorStatus = async(req, res)=>{
    try{
        const response = await ColorModel.updateOne(
            req.params,
            {$set:req.body}
            
        );
        console.log(req.body);
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    } 
}

//delete single color
const deleteColor = async(req,res)=>{
    try{
        const response = await ColorModel.deleteOne(req.params);
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//delete multiple colors
const deleteColors = async(req,res)=>{
    try{
        const response = await ColorModel.deleteMany({
            _id: {$in: req.body.checkedColor}
        });
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//read single color
const viewColor = async(req,res)=>{
    try{
        const response = await ColorModel.findOne(req.params);
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}


//Update Color
const updateColor = async(req,res)=>{
    try{
        const response = await ColorModel.updateOne(req.params,
            {$set: req.body}
        )
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//Active Colors
const ActiveColors = async(req,res)=>{
    try{
        const response = await ColorModel.find({status: true});
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message: "internal server error"});
    }
}



module.exports = {
    createColor,
    viewColorCategories,
    updateColorStatus,
    deleteColor,
    deleteColors,
    viewColor,
    updateColor,
    ActiveColors
}