import CustomerModel from "../models/customers.model.js";
import { validateEmail } from "../config/utils.js";


export const getCustomers = async ( req , res ) => {
    try{  
        const customers = await CustomerModel.find();
        return res.status(200).send(customers);
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}


export const createCustomer = async ( req , res ) => {
    try{ 
        const { fullname, username, email } = req.body;
        if(!username || !email || !validateEmail(email)) return res.status(400).send({message: `please enter all fields`});
        const customer = await CustomerModel.create(req.body);
        return res.status(200).send(customer);
    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

export const updateCustomer = async ( req , res ) => {
    try{
        const { id } = req.params; 

        if(!id) return res.status(404).send({message: `Could not find a customer with id: ${id}`});

        const updateCustomer = await CustomerModel.findByIdAndUpdate(id, req.body);
        
        if(updateCustomer){
            const customer = await CustomerModel.find({_id:id});
            return res.status(200).send(customer);
        }

        return res.status(401).send({message : 'Could not update customer detail'});

    }catch(err){
        return res.status(500).send({message : err.messaage});
    }
}

export const deleteCustomer = async ( req , res ) => {
    try{
        const { id } = req.params;

        if(!id) return res.status(404).send({message: `Could not find a customer with id: ${id}`});

        const deleteCustomer = await CustomerModel.findByIdAndDelete(id);

        if(!deleteCustomer){
            return  res.status(404).send({message: 'Could not delete customer'});
        }

        return res.status(200).send({message: 'Customer deleted successfully'});

    }catch(err){

        return res.status(500).send({message: err.message});

    }
}

