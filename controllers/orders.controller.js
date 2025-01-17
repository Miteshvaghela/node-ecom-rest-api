import express from 'express';
import { validateEmail } from '../config/utils.js';
import OrderModel from '../models/orders.model.js';
import ProductModel from '../models/products.model.js';
import mongoose from 'mongoose';

export const getOrders = async (req, res) => {
    try{  
        const orders = await OrderModel.find();
        return res.status(200).send(orders);
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

export const createOrder = async (req, res) => {
    try{ 
        let { customerName, customerEmail, totalPrice, customerAddress, products } = req.body;
        if(!customerName || !customerEmail || !validateEmail(customerEmail) || !totalPrice || !customerAddress || products.length === 0) return res.status(400).send({message: `please provide all the details`});
        
        // Convert comma-separated product IDs to an array 
        let productsInput = products.split(',').map(id => id.trim());

        // Find all products by their IDs
        const productObjectIds = productsInput.map(productId => new mongoose.Types.ObjectId(productId));

        //console.log('Product ids : ', productObjectIds);

        const productDocument = await ProductModel.find({ '_id': { $in: productObjectIds } }); 
        if (productDocument.length !== productObjectIds.length) {
            return res.status(404).json({ message: 'One or more products not found' });
        }
        
        //console.log('Product document : ', productDocument);

         // Calculate total price
         totalPrice = productDocument.reduce((total, item) => total + item.price, 0);

        products = productObjectIds;
        // Create and save the order
        let order = new OrderModel({
            customerName,
            customerEmail,
            customerAddress,
            products,
            totalPrice
        });

        await order.save();       

        //const order = await OrderModel.create(req.body);

        return res.status(200).send(order);
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
export const deleteOrder = async (req, res) => {
    try{
        const { id } = req.params;

        if(!id) return res.status(404).send({message: `Could not find a order with id: ${id}`});

        const deleteOrder = await OrderModel.findByIdAndDelete(id);

        if(!deleteOrder){
            return  res.status(404).send({message: 'Could not delete order'});
        }

        return res.status(200).send({message: 'Order deleted successfully'});

    }catch(err){

        return res.status(500).send({message: err.message});

    }
}
export const updateOrder = async (req, res) => {
    try{ 
        const { id } = req.params;
        let { customerName, customerEmail, totalPrice, customerAddress, products } = req.body; 

        // Find the order by ID
        const fetchOrder = await OrderModel.findById(id);
        if (!fetchOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        let getTotalPrice = 0;

         // Calculate total price
         if(products){
            // Convert comma-separated product IDs to an array 
            let productsInput = products.split(',').map(id => id.trim());

            // Find all products by their IDs
            const updatedProductObjectIds = productsInput.map(productId => new mongoose.Types.ObjectId(productId)); 

            const productDocument = await ProductModel.find({ '_id': { $in: updatedProductObjectIds } }); 
            if (productDocument.length !== updatedProductObjectIds.length) {
                return res.status(404).json({ message: 'One or more products not found' });
            } 

            // Calculate total price
            getTotalPrice = productDocument.reduce((total, item) => total + item.price, 0);

            fetchOrder.products = updatedProductObjectIds;
            fetchOrder.totalPrice = getTotalPrice;
         }

        
        // Update the order        
        
        fetchOrder.customerName = customerName;
        fetchOrder.customerEmail = customerEmail;
        fetchOrder.customerAddress = customerAddress;
        await fetchOrder.save();

        return res.status(200).json(fetchOrder); 

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}
export const AddProductToOrder = async (req, res) => {
    try {
        const { id, pid } = req.params;

        // Find the order by ID
        const fetchOrder = await OrderModel.findById(id);
        if (!fetchOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        

        const product = await ProductModel.findById(pid);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        //console.log(fetchOrder, product);

        fetchOrder.products.push(product);
        fetchOrder.totalPrice += product.price;
        await fetchOrder.save();

        return res.status(200).json(fetchOrder);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }

}
export const RemoveProductToOrder = async (req, res) => {

    try {
        const { id, pid } = req.params;

        const fetchOrder = await OrderModel.findById(id).populate('products');
        if (!fetchOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }

        const productIndex = fetchOrder.products.findIndex(prod => prod._id.toString() === pid);
        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in order' });
        }

        const product = fetchOrder.products[productIndex];
        fetchOrder.products.splice(productIndex, 1);
        fetchOrder.totalPrice -= product.price;
        await fetchOrder.save();

        return res.status(200).json(fetchOrder);
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error });
    }

}