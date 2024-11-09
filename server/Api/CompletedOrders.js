import express from 'express';
import { CompletedOrderModel } from '../Database/completedOrder.js';

//initialize router
const Router = express.Router();

//parse the json request
Router.use(express.json());

/*
Route:/
Descript:getting the all completed orders
params: none
Access: admin
Method: get
*/

Router.get('/', async (req, res) => {
    try {
        const allCompletedOrders = await CompletedOrderModel.find({});
        if (allCompletedOrders) {
            return res.status(200).json(allCompletedOrders);
        }
    } catch (err) {

    }
})

/*
Route:/
Descript:posting the completed orders
params: email
Access: none
Method: get
*/

Router.get('/:email', async (req, res) => {
    try {
        // console.log(req.params.email);
        const completedOrders = await CompletedOrderModel.find(req.params);
        if (completedOrders) {
            return res.status(200).json(completedOrders);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})


export default Router;
