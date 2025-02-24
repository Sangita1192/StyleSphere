const mongoose = require('mongoose');

const SliderSchema = new mongoose.Schema({
    slider_name:{
        type:String,
        required:true,
        unique:true
    },
    heading:String,
    sub_heading:String,
    image:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at: Date,
    updated_at: {
        type:Date,
        default:Date.now()
    }
});

SliderSchema.pre('insertOne', function(){
    this.created_at = Date.now();
});
SliderSchema.pre('save', function(){
    this.created_at = Date.now();
});

const Slider = mongoose.model('sliders', SliderSchema);

module.exports = Slider;