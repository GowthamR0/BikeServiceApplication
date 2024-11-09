import express from 'express';

//importing nodeMailer
import nodemailer from 'nodemailer';

import { OrderModel } from '../Database/order.js';
import { UserModel } from '../Database/user.js';
import { ServiceModel } from '../Database/service.js'
import { CompletedOrderModel } from '../Database/completedOrder.js';

//to vaoid reloading and acts as an 
const Router = express.Router();

Router.use(express.json());

//Nodemailer transport setup
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'robot23062003@gmail.com',
        pass: 'ckxe ycbr ibkb yvhn'
    }
});

/*
Route:/
Descript:fetching all orders using email
params: email
Access: none
Method: get
*/

Router.get('/:email', async (req, res) => {
    try {
        const response = await OrderModel.find(req.params);
        return res.status(200).json(response);
    } catch (err) {
        return res.status(500).json(err);
    }
})

/*
Route:/allOrders
Descript:fetching all orders
params: none
Access: admin
Method: get
*/

Router.get('/', async (req, res) => {
    try {
        // console.log('get all orders');
        const allOrders = await OrderModel.find({});
        // console.log(allOrders);
        if (allOrders) {
            return res.status(200).json(allOrders);
        }
    } catch (err) {
        return res.status(500).json(err);
    }
})

/*
Route:/new
Descript:posting the service
params: none
Access: none
Method: post
*/

Router.post('/new', async (req, res) => {
    try {

        //fetch the userdata
        const user = await UserModel.findOne({ email: req.body.credentials.email });

        const { servicesRequired } = req.body.credentials;

        // Array to store service details
        const serviceDetails = [];

        let amount = 0;

        // Iterate over servicesRequired array
        for (const itemId of servicesRequired) {
            // Find the service by its ID
            const serviceData = await ServiceModel.findById(itemId);

            // Push the _id and itemName to the serviceDetails array
            if (serviceData) {
                amount += parseInt(serviceData.price);
                serviceDetails.push({ _id: serviceData._id, itemName: serviceData.itemName });
            }
        }

        // Construct email text with user's name and service details
        let emailText = `Customer Name: ${user.fullName} has booked the following services:\n\n`;
        for (const service of serviceDetails) {
            emailText += `Service ID: ${service._id}, Service Name: ${service.itemName}\n`;
        }


        const mailOptions = {
            from: 'robot23062003@gmail.com',
            to: 'arunkumarp23062003@gmail.com',
            subject: 'Vechicle Status',
            text: emailText
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error });
            } else {
                // console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'email sended successfully' });
            }
        })


        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const fullDate = day + "-" + month + "-" + year;

        // creating a newOrder
        const newOrder = await OrderModel.create({
            ...req.body.credentials,
            servicesRequired: serviceDetails,
            totalAmount: amount,
            serviceStatus: "Booked",
            date: fullDate
        });

        if (newOrder) {
            return res.status(200).json(newOrder);
        }

    } catch (err) {
        return res.status(500).json(err.message);
    }
});

/*
Route:/update/:id
Descript:updating the users order 
params: id
Access: admin
Method: put
*/

Router.put('/update/:id', async (req, res) => {
    try {
        //fetch the order details to update the order payment,service status
        const order = await OrderModel.findById(req.params.id);

        // console.log(req.body.credentials);

        const bookingStatus = req.body.credentials.serviceStatus.toLowerCase();
        const paymentStatus = req.body.credentials.paymentStatus.toLowerCase();

        //sending mail notification after bookingstatus
        if (bookingStatus === 'accepted') {
            const mailOptions = {
                from: 'robot23062003@gmail.com',
                to: req.body.credentials.email,
                subject: 'Vechicle Status',
                text: "Your service has been accepted Come at on time"
            }
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error });
                } else {
                    // console.log('Email sent:', info.response);
                    return res.status(200).json({ message: 'email sended successfully' });
                }
            })
        }
        else if (bookingStatus === 'delivery') {
            const mailOptions = {
                from: 'robot23062003@gmail.com',
                to: req.body.credentials.email,
                subject: 'Vechicle Status',
                text: 'Your Vechicle is ready for delivery'
            }

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                    return res.status(500).json({ error });
                } else {
                    // console.log('Email sent:', info.response);
                    return res.status(200).json({ message: 'email sended successfully' });
                }
            })
        }

        //updating the order by id
        if (order) {
            const updatedOrder = await OrderModel.findByIdAndUpdate(
                { _id: req.params.id },
                { $set: req.body.credentials },
                { new: true },
            )

            //updating the orders
            await updatedOrder.save();

            //if paided delete from order and add it in completeedOrders
            if (paymentStatus === 'paided' && bookingStatus === 'delivered') {
                const { email, bikeName, bikeNumber, servicesRequired, totalAmount, paymentStatus, serviceStatus, date } = updatedOrder;
                const newCompletedOrder = await CompletedOrderModel.create({ email, bikeName, bikeNumber, servicesRequired, totalAmount, paymentStatus, serviceStatus, date });
                await OrderModel.findByIdAndDelete({ _id: updatedOrder._id });
            }
            return res.status(200).json({ updatedOrder });
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

export default Router;