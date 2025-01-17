import mongoose, { mongo } from 'mongoose';

const CustomerSchema = mongoose.Schema({
    fullname : {
        type : String,
        required : true
    },
    username : {
        type : String,
        require : true
    },
    email : {
        type : String, 
        require : true
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


const CustomerModel = mongoose.model('Customer', CustomerSchema);

export default CustomerModel;

