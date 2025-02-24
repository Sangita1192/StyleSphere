const Order = require("../../models/order");

const readOrders = async(req,res)=>{
    try{
        const response = await Order.find().populate('user');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:"success",filePath, data: response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

module.exports = readOrders