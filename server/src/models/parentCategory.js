const mongoose = require('mongoose');
const multer = require('multer');


const parentCategorySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String, 
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type: Date,
        default: Date.now()
    }
})

//Schema MiddleWares
parentCategorySchema.pre('save', function(){
    this.created_at = new Date();
});

parentCategorySchema.pre('insertOne', function(){
    this.created_at = new Date();
});

//Create Model
const ParentCategory = mongoose.model('parentcategories', parentCategorySchema);

module.exports = ParentCategory;