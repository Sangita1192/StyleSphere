const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    story_name: {
        type: String,
        required:true,
        unique:true
    },
    story_img: String,
    banner: String,
    description:String,
    status:{
        type:Boolean,
        default:true
    },
    created_at:Date,
    updated_at:{
        type:Date,
        default: Date.now()
    }
});

storySchema.pre('save', function(){
    this.created_at = Date.now();
});

storySchema.pre('insertOne', function(){
    this.created_at = Date.now();
});

//create Model
const Story = mongoose.model('stories', storySchema)

module.exports = Story;