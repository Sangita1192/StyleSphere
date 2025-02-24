//create wishlist controller

const Product = require("../../models/product");
const User = require("../../models/user");
const Wishlist = require("../../models/wishlist");

const createWishlist = async (req, res) => {
    try {
        const { user, product } = req.body; // Get user ID and product ID from the request body
        // Validate if user exists
        const foundUser = await User.findById(user);
        if (!foundUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Validate if product exists
        const foundProduct = await Product.findById(product);
        if (!foundProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Find the user's wishlist
        let wishlist = await Wishlist.findOne({ user: user });

        // If the user doesn't have a wishlist, create a new one
        if (!wishlist) {
            wishlist = new Wishlist({
                user: user,
                products: [product], // Initialize the products array with the new product
            });
        }
        else {
            // Check if the product is already in the wishlist
            if (wishlist.products.includes(product)) {
                return res.status(400).json({ message: 'Product is already in the wishlist' });
            }

            // Add the product to the products array
            wishlist.products.push(product);
        }

        // Save the updated wishlist
        const response = await wishlist.save();
        res.status(200).json({ message: "success", data: response });
    }

    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

//remove from wishList 
const deleteProductFromWishlist = async (req, res) => {
    try {
        const { user, product } = req.query;
        
        const isUserExist = await Wishlist.findOne({user});
        if(!isUserExist) return ({message:"User not found"});

        //$pull operator removes elements from an array 
        const response = await Wishlist.updateOne(
            { user },
            { $pull: { products: product } });    
 
        return res.status(200).json({ message: 'Product removed from wishlist', data:response });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server error' });
    }
}


//read wishlist for specific user

const wishlistsForUser = async (req, res) => {
    try {
        const userId = req.params.user; // Get userId from URL parameters

        // Find the wishlist for the specific user
        const wishlist = await Wishlist.findOne({ user: userId })
            .populate({
                path: 'products', // Populate the products array
                populate: [
                    { path: 'color' },            // Populate color field in the product
                    { path: 'size' },             // Populate size field in the product
                    { path: 'parent_category' },  // Populate parent_category field
                    { path: 'product_category' }, // Populate product_category field
                ],
            });

        // Check if the wishlist exists
        if (!wishlist) {
            return res.status(404).json({ message: 'Wishlist not found for this user' });
        }
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: "success", filePath, data: wishlist });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!!" });
    }
}

module.exports = {
    createWishlist,
    wishlistsForUser,
    deleteProductFromWishlist 
}