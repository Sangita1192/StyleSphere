const Banner = require("../../models/banner");

const createBanner = async (req, res) => {
    try {

        const data = req.body;
        if (req.files) data.image = req.files.image[0].filename;
        if (req.body.start_date || req.body.end_date) {
            data.start_date = req.body.start_date[1];
            data.end_date = req.body.end_date[1];
        }

        const dataToSave = new Banner(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

const readBanners = async (req, res) => {
    try {
        const response = await Banner.find();
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: "success", filePath, data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

//update fallback status
const updateIsfallback = async(req,res)=>{
    try{
        const response = await Banner.updateOne(
            req.params,
            {$set:req.body}
            
        );
        res.status(200).json({message:"success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error"});
    } 
}

//delete Single Banner
const deleteBanner = async(req,res)=>{
    try{
        const response = await Banner.deleteOne(req.params);
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

//delete Many Banners
const deleteBanners = async(req,res)=>{
    try{
        const response = await Banner.deleteMany({
            _id: {$in: req.body.checkedBanner}
        });
        res.status(200).json({message: "success", data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

module.exports = {
    createBanner,
    readBanners,
    updateIsfallback,
    deleteBanner,
    deleteBanners
}