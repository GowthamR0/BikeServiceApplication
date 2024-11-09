//Installing needed package
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import cors from 'cors';

//importing support Apis
import Auth from './Api/Auth.js';
import Service from './Api/Services.js'
import Order from './Api/Orders.js';
import CompletedOrder from './Api/CompletedOrders.js'

//creating instance for express
const app = express();;
app.use(express.json()); //parsing the json payloads and make them to avaialable in req.body
app.use(express.urlencoded({ extended: false }));   //parsing incoming request body which is in urlencoded format

app.use(cookieParser());
app.use(cors());

//support Apis
app.use('/auth', Auth);
app.use('/service', Service)
app.use('/order', Order);
app.use('/completedOrder', CompletedOrder);

// Listening to the port 4000 and connecting to the db, showing a message if successful
app.listen(4000, () => {
    mongoose.connect("mongodb+srv://arunkumar123:arun123@bikeappcluster.nhasiwh.mongodb.net/")
        .then(() => console.log("Server is running on port 4000"))
        .catch((err) => console.log(err.message));
});

//to check the port listening
app.use('/', (req, res) => {
    return res.json("Server is active on port 4000");
})
