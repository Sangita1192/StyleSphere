const mongoose = require('mongoose');
const multer = require('multer');


const productSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    description: String,
    thumbnail: String,
    parent_category:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'parentcategories'
    },
    slug: String,
    status:{
        type:Boolean,
        default: true
    },
    isFeatured:{
        type:Boolean,
        default: false
    },
    created_at:{
        type: Date
    },
    updated_at:{
        type: Date,
        default: Date.now()
    }   
})


//Schema MiddleWare

productSchema.pre('save', function(){
    this.created_at = new Date();
});

productSchema.pre('insertOne', function(){
    this.created_at = new Date();
})

//Create Model

const ProductCategory = mongoose.model('productCategory', productSchema);

//Export Model
module.exports = ProductCategory;