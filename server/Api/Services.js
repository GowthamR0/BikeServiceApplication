import express from 'express';

//import Service Model to interact with collection
import { ServiceModel } from '../Database/service.js';

//to vaoid reloading and acts as an 
const Router = express.Router();

Router.use(express.json());

/*
Route:/
Descript:getting the service
params: none
Access: none
Method: GET
*/
Router.get('/', async (req, res) => {
    try {
        // Fetch all documents from the ServiceModel collection
        const services = await ServiceModel.find();

        if (services) {
            return res.status(200).json(services);
        }

    } catch (err) {
        return res.status(500).json(err.message);
    }
})

/*
Route:/
Descript:storing the service with service name,des,price
params: none
Access: admin
Method: POST
*/

Router.post('/new', async (req, res) => {
    try {
        //create a new Item
        const newItem = await ServiceModel.create(req.body.credentials);

        if (newItem) {
            return res.status(200).json({ newItem });
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

/*
Route:/update/:id
Descript:update the service with service name,des,price
params: id
Access: admin
Method: PUT
*/
Router.put('/update/:id', async (req, res) => {
    try {
        //fetch the item
        const item = await ServiceModel.findById(req.params.id);

        const updatedItem = await ServiceModel.findByIdAndUpdate(
            { _id: item._id },
            { $set: req.body.credentials },
            { new: true }
        );

        await updatedItem.save();

        if (updatedItem) {
            return res.status(200).json({ updatedItem });
        }

    } catch (err) {
        return res.status(500).json(err.message);
    }
})

/*
Route:/delete/:id
Descript:delete the collection using id
params: id
Access: admin
Method: delete
*/

Router.delete('/delete/:id', async (req, res) => {
    try {
        //fetches the collection
        const item = await ServiceModel.findById(req.params.id);

        if (item) {

            //delete the item
            await ServiceModel.findByIdAndDelete(req.params.id);

            return res.status(200).json({ message: "items deleted" });
        }

    } catch (err) {
        return res.status(500).json(err.message);
    }
})

export default Router;