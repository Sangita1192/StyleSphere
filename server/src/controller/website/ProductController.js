const Product = require("../../models/product");

const ActiveProductByParentCatWeb = async (req, res) => {
    try {
        const response = await Product.find({ parent_category: req.params.parent_category, status: true })
            .populate('parent_category')
            .populate('product_category')
            .populate('size')
            .populate('color');

        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: "success", filePath, data: response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }

}

//Search Products by Key 

const SearchProducts = async (req, res) => {

    try {
        const escapedKey = req.params.key.replace(/[\-\[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
        const regexPattern = new RegExp(`.*${escapedKey}.*`, 'i');

        const response = await Product.find({
            status: true,
            $or: [
                { name: regexPattern },
                { description: regexPattern },
                { short_description: regexPattern }, // Match short description
                { brand: regexPattern }, // Match brand

            ]
        })
            .populate('product_category')
            .populate('parent_category')
            .populate('color')
            .populate('size');

        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;

        res.status(200).json({
            message: "success",
            data: response,
            filePath
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

//read all active products

const AllProductWeb = async (req, res) => {
    try {
        const response = await Product.find({ status: true })
            .populate('parent_category')
            .populate('product_category')
            .populate('size')
            .populate('color');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: "success", filePath, data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" })

    }
}


//read specific product for web

const readProductWeb = async (req, res) => {
    try {
        console.log("req.params", req.params);
        const response = await Product.find(req.params)
            .populate('parent_category')
            .populate('product_category')
            .populate('size')
            .populate('color');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: "success", data: response, filePath });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error!" });
    }
}


//increment ViewCount of Product
const incrementViewsCountOfProduct = async (req, res) => {
    try {
        const product = await Product.findOne(req.params);
        if (product) {
            product.viewsCount += 1;
            product.lastViewedAt = Date.now();
            const response = await product.save();
            res.status(200).json({ message: "success", data: response });
            console.log(response);
        } else {
            res.status(404).json({ message: "product not found" });
        }

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}

//Get Most Viewed Products
const mostViewedProducts = async (req, res) => {
    try {
        // Get products sorted by viewCount in descending order
        const mostViewedProductsList = await Product.find()
            .sort({ viewsCount: -1 })
            .limit(10);  //fetch top 10
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: "success", data: mostViewedProductsList, filePath })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}


//Get Latest 10 Products as per createdAt field
const newlyArrivedProducts = async (req, res) => {
    try {
        const response = await Product.find()
            .sort({ created_at: -1 })
            .limit(10)
            .populate('color');
        const filePath = `${req.protocol}://${req.get('host')}/frank-and-oak-admin-files/`;
        res.status(200).json({ message: 'success', filePath, data: response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "internal server error" });
    }
}
module.exports = {
    ActiveProductByParentCatWeb,
    SearchProducts,
    AllProductWeb,
    readProductWeb,
    incrementViewsCountOfProduct,
    mostViewedProducts,
    newlyArrivedProducts

}