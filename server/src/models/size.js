const mongoose = require('mongoose');
const multer = require('multer');

const sizeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength: 4, // ensures only 1 character
        minlength: 1,
    },
    order:{
        type:Number,
        required: true
    },
    status:{
        type:Boolean,
        default: true
    },
    created_at:{
        type:Date,
    },
    updated_at:{
        type: Date,
        default: Date.now()
    }
});

//Schema middleware

sizeSchema.pre('save',function(){
    this.created_at = Date.now();
});
sizeSchema.pre('insertOne',function(){
    this.created_at = Date.now();
});

//create model

const SizeModel = mongoose.model('productSizes', sizeSchema );

module.exports = SizeModel;