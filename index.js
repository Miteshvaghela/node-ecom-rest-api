import express from 'express';
import { connectDB } from './config/db.js';
import bodyParser from 'body-parser';
import CustomerRoute from './routes/customers.route.js';
import ProductRoute from './routes/products.route.js';
import OrderRoute from './routes/orders.route.js'

const app = express();
const port = process.env.PORT;

//app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/customers', CustomerRoute);
app.use('/api/products', ProductRoute);
app.use('/api/orders', OrderRoute);


app.listen(port, () => {
    connectDB(); // connecting to database
    console.log(`Server running on port : ${port}`);        
});
    
