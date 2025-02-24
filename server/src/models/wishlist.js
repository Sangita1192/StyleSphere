const mongoose = require('mongoose');

const WishlistSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
   products:[ {
    type:mongoose.Schema.Types.ObjectId,
    ref:'products',
    required:true
    }],
    createdAt:Date,
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

WishlistSchema.pre('save', function(){
    this.createdAt = Date.now();
});
WishlistSchema.pre('insertOne', function(){
    this.createdAt = Date.now();
});

const Wishlist = mongoose.model('wishlist', WishlistSchema);

module.exports = Wishlist;