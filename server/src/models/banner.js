const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    subtitle: String,
    image:{
        type:String,
        require:true
    },
    link:String,
    start_date: Date,
    end_date: Date,
    isFallback: {
        type:Boolean,
        default:false
    }
});

const Banner = mongoose.model('banner', bannerSchema);

module.exports = Banner;