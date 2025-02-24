const Cart = require("../../models/cart");

const createCart = async (req, res) => {
    try {
        const { user, product, color, size } = req.body;
        const isFindData = await Cart.findOne({
            user,
            product,
            color,
            size
        })

        if (isFindData) {
            const response = await Cart.updateOne(
                { _id: isFindData._id },
                {
                    $set: {
                        quantity: isFindData.quantity + 1
                    }
                });
            res.status(200).json({ message: "success", data: response });
            return;
        }
        const dataToSave = new Cart(req.body);
        const response = await dataToSave.save();
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error" });
        console.log(error);
    }
}


//readCartcontroller

const readCartforUser = async (req, res) => {
    try {
        const response = await Cart.find({ user: req.params.user })
            .populate('color')
            .populate('size')
            .populate('product');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: "success", filePath, data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });

    }
}

//update Quanity
const updateCartItemQty = async (req, res) => {
    try {
        const response = await Cart.updateOne(
            req.params,
            { $set: req.body }
        );
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

//deleteCartItem

const deleteCartItem = async (req, res) => {
    try {
        const response = await Cart.deleteOne(req.params);
        res.status(200).json({ message: "success", data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

//deleteAllCartItem 
const deleteCartItems = async (req, res) => {
    try {
        console.log(req.params);
        const response = await Cart.deleteMany({ user: req.params.id });
        res.status(200).json({ message: 'success', data:response});
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal server error' });
    }

}

module.exports = {
    createCart,
    readCartforUser,
    updateCartItemQty,
    deleteCartItem,
    deleteCartItems
}