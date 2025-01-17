import express from 'express';
import mongoose, { mongo } from 'mongoose'; 


const OrderSchema = mongoose.Schema({
    customerName : {
        type : String,
        require : true
    },
    customerEmail : {
        type : String,
        require : true
    },
    totalPrice : {
        type : Number, 
        require : true
    },    
    customerAddress : {
        type : String,
        require : true
    },
    products : [
        { 
            type : mongoose.Schema.Types.ObjectId, ref: 'Product',
            require : true,
            index : true
        }
    ],
    status : {
        type : String,
        require : true,
        default : true
    }
},
{
    timestamps : true
});

const OrderModel = mongoose.model('Order', OrderSchema);

export default OrderModel;