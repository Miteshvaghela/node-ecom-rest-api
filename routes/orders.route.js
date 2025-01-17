import express from 'express';
import { 
        getOrders,
        createOrder, 
        deleteOrder, 
        updateOrder, 
        AddProductToOrder, 
        RemoveProductToOrder } from '../controllers/orders.controller.js';
        
const OrderRoute = express.Router();

OrderRoute.get('/', getOrders);
OrderRoute.post('/', createOrder);
OrderRoute.delete('/:id', deleteOrder);
OrderRoute.put('/:id', updateOrder);
OrderRoute.put('/:id/products/add/:pid', AddProductToOrder);
OrderRoute.put('/:id/products/remove/:pid', RemoveProductToOrder);

export default OrderRoute;