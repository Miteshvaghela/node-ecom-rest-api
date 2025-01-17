import express from 'express';
import ProductModel from '../models/products.model.js';

export const getAllProducts = async (req, res) => {
    try{  
        const products = await ProductModel.find();
        return res.status(200).send(products);
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
export const createProduct = async (req, res) => {
    try{ 
        const { name, price } = req.body;
        if(!name || !price) return res.status(400).send({message: `please enter all fields`});

        const product = await ProductModel.create(req.body);
        if(!product){ return res.status(400).send({message: `could not create product`}); }

        return res.status(200).send(product);
    }catch(err){
        return res.status(500).json({message : err.message})
    }

}
export const deleteProduct = async (req, res) => {
    try{
        const { id } = req.params;

        if(!id) return res.status(404).send({message: `Could not find a product with id: ${id}`});

        const deleteProduct = await ProductModel.findByIdAndDelete(id);

        if(!deleteProduct){
            return  res.status(404).send({message: 'Could not delete product'});
        }

        return res.status(200).send({message: 'Product deleted successfully'});

    }catch(err){

        return res.status(500).send({message: err.message});

    }
}
export const updateProduct = async (req, res) => {
    try{
        const { id } = req.params; 

        if(!id) return res.status(404).send({message: `Could not find a product with id: ${id}`});

        const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body);
        
        if(updateProduct){
            const product = await ProductModel.find({_id:id});
            return res.status(200).send(product);
        }

        return res.status(401).send({message : 'Could not update product detail'});

    }catch(err){
        return res.status(500).send({message : err.messaage});
    }
}
export const addProductToOrder = async (req, res) => {}
export const removeProductFromOrder = async (req, res) => {}
