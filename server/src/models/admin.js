const mongoose = require('mongoose');
const multer = require('multer');

const AdminSchema = new mongoose.Schema({
   
    name:String,
    facebook:String,
    instagram:String,
    youtube:String,
    twitter:String,
    logo:String,
    favicon:String,
    footer_logo:String,
    thumbnail:String,
    email:String,
    password:String,
    created_at: Date,
    updated_at: {
        type: Date,
        default: Date.now()
    }
})
//schema middleware
AdminSchema.pre('save', function(){
    this.created_at = Date.now();
})

AdminSchema.pre('insertOne', function(){
    this.created_at = Date.now();
})


//create model
const Admin = mongoose.model('admins', AdminSchema);

module.exports = Admin;