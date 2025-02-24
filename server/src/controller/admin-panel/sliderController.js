const Slider = require("../../models/slider");


const createSlider = async(req,res)=>{
    try{
        const data = req.body;
        if(req.files) data.image = req.files.image[0].filename;
        const dataToSave = new Slider(data);
        const response = await dataToSave.save();

        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        res.status(500).json({message:"internal server error!"});
        console.log(error);
    }
}

//read all sliders
const readSliders = async(req,res)=>{
    try{
        const response = await Slider.find();
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success", filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//Update Slider Status
const updateSliderStatus = async(req,res)=>{
    try{
        const response = await Slider.updateOne(req.params,
            {$set: req.body}
        )
        res.status(200).json({message:"success", data:response})
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//delete Specific Slider
const deleteSlider = async(req,res)=>{
    try{
        const response = await Slider.deleteOne(req.params);
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}

//delete Multiple sliders
const deleteSliders = async(req,res)=>{
    try{
        const response = await Slider.deleteMany({_id: {$in: req.body.checkedSlider}});
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//read specific slider details
const readSlider  = async(req,res)=>{
    try{
        const response = await Slider.findOne(req.params);
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success", filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }    
}

//update Slider
const updateSlider = async(req,res)=>{
    try{
        const data = req.body;      
        if(req.files) 
        { if(req.files.image) data.image = req.files.image[0].filename; }       
        const response = await Slider.updateOne(req.params,
            {$set: data}
        );
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    }
}


module.exports = {
    createSlider,
    readSliders,
    updateSliderStatus,
    deleteSlider,
    deleteSliders,
    readSlider,
    updateSlider
}