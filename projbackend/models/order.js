const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productCartSchema=new mongoose.Schema({
    product:{
        type:ObjectId,
        ref:"Product"
    },
    name:{
        type:String
    },
    count:{
        type:Number
    },
    price:{
        type:Number
    }
})


const orderSchema = new mongoose.Schema({
    products:[productCartSchema],
    trainsaction_id:{},
    amount:{type:Number},
    address:String,
    updated:Date,
    User:{
        type:ObjectId,
        ref:"User"
    }
}, { timestamps: true });

const Order= mongoose.model("Order", orderSchema);
const ProductCart = mongoose.model("ProductCart", productCartSchema);

module.exports={Order,ProductCart};