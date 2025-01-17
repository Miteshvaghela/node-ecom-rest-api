import express from 'express';
import { getAllProducts, createProduct, deleteProduct, updateProduct } from '../controllers/products.controller.js'
const ProductRouter = express.Router();

ProductRouter.get('/', getAllProducts); 
ProductRouter.post('/', createProduct);
ProductRouter.delete('/:id', deleteProduct);
ProductRouter.put('/:id', updateProduct); 

export default ProductRouter;