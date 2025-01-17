import express from 'express';
import mongoose from 'mongoose'; 


const ProductSchema = mongoose.Schema({
    name : {
        type : String,
        require : true
    },
    price : {
        type : Number, 
        require : true
    },
    description : {
        type : String,
        require : false
    },
    quantity : {
        type : Number,
        require : true,
        default : 0
    },
    status : {
        type : Boolean,
        require : true,
        default : true
    }
},
{
    timestamps : true
});

const ProductModel = mongoose.model('Product', ProductSchema);

export default ProductModel;