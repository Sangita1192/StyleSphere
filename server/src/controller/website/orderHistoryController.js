const Order = require('../../models/order');

const readOrderHistory = async(req, res)=>{
    try{
        console.log(req.params);
        const response = await Order.find(req.params);
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({message:'success',filePath, data:response});
    }
    catch(error){
        console.log(error);
        res.status(500).json({message:"internal server error!"});
    }
}

module.exports = {
    readOrderHistory
}