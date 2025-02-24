const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type:String,
    },
    status:{
        type:Boolean,
        default:true
    },
    created_at: Date,
    updated_at: {
        type: Date,
        default: Date.now()
    }
});

colorSchema.pre('save',function(){
    this.created_at = Date.now();
});
colorSchema.pre('insertOne', function(){
    this.created_at = Date.now();
})

//createModel
const ColorModel = mongoose.model('colors', colorSchema);

module.exports = ColorModel;