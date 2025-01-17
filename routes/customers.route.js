import express from 'express';
import { getCustomers, createCustomer, updateCustomer, deleteCustomer } from "../controllers/customers.controller.js";

const CustomerRouter = express.Router();

CustomerRouter.get('/', getCustomers);
CustomerRouter.post('/', createCustomer);
CustomerRouter.delete('/:id', deleteCustomer);
CustomerRouter.put('/:id', updateCustomer);

export default CustomerRouter;