const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required:true
    },
    items:Object,
    customer:Object,
    session: Object,
    amount:Number,
    productId:Object,
    status:{
        type:String,
        enum:['pending', 'success', 'failed'],
        default: 'pending'
    },
    createdAt: Date,
    updatedAt:{
        type:Date,
        default:Date.now()
    }
});

OrderSchema.pre('save', function(){
    this.createdAt= Date.now();
});

OrderSchema.pre('insertOne', function(){
    this.createdAt= Date.now();
});

const Order = mongoose.model('orders', OrderSchema);

module.exports = Order;