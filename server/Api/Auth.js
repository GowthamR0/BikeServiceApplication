import express from 'express';
import bcrypt from 'bcrypt';    //used for hasing 
import jwt from 'jsonwebtoken';
import { UserModel } from '../Database/user.js';   //used to interact with userModel
import { TempUserModel } from '../Database/TempUser.js';
import { OrderModel } from '../Database/order.js';

//importing nodeMailer
import nodemailer from 'nodemailer';

//secretkey
const secretKey = 'aswerfegetegee';

//to avoid reloading or prevent from reloading
const Router = express.Router();

Router.use(express.json());

/*
Route:/signup/tempUser
Descript:creating tempuser with fullName,email,password,phoneNumber
params: none
Access: public
Method: POST
*/

Router.post('/signup/tempuser', async (req, res) => {
    try {

        // console.log(req.body.credentials);

        await UserModel.findEmail(req.body.credentials);

        const existingTempUser = await TempUserModel.findOne({ email: req.body.credentials.email });
        //Nodemailer transport setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'robot23062003@gmail.com',
                pass: 'ckxe ycbr ibkb yvhn'
            }
        })

        //generate random OTP
        const otp = Math.floor(100000 + Math.random() * 90000);

        //mailOptions
        const mailOptions = {
            from: 'robot23062003@gmail.com',
            to: req.body.credentials.email,
            subject: 'OTP for signup',
            text: `Your OTP for signup is: ${otp} and it is valid for 10 minutes`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error });
            } else {
                // console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'OTP sent successfully' });
            }
        })

        const { password } = req.body.credentials;

        const salt = await bcrypt.genSalt(10); //salting with 10 rounds
        const hashedPassword = await bcrypt.hash(password, salt); // hashing by comparing with salt
        const updatedEmail = req.body.credentials.email.trim(); // removing leading and trailing zeros

        //creating new user with hashed password
        const newUser = await TempUserModel.create({
            ...req.body.credentials,
            email: updatedEmail,
            password: hashedPassword,
            role: 'customer',
            otp: otp
        });

        if (newUser) {
            return res.status(200).json(newUser._id);  // sending success message
        }

    }
    catch (err) {
        return res.status(500).json(err.message);
    }
})

/*
Route:/signup/tempUser/:id
Descript:resent the otp and update the tempuser
params: id
Access: public
Method: PUT
*/

Router.put('/signup/tempuser/:id', async (req, res) => {
    try {
        //checking the existing user in the TempUserModel
        const existingTempUser = await TempUserModel.findById(req.params.id);

        //Nodemailer transport setup
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'robot23062003@gmail.com',
                pass: 'ckxe ycbr ibkb yvhn'
            }
        })

        //generate random OTP
        const updatedotp = Math.floor(100000 + Math.random() * 90000);

        //mailOptions
        const mailOptions = {
            from: 'robot23062003@gmail.com',
            to: existingTempUser.email,
            subject: 'OTP for signup',
            text: `Your OTP for signup is: ${updatedotp} and it is valid for 10 minutes`
        }

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email:', error);
                return res.status(500).json({ error });
            } else {
                // console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'OTP sent successfully' });
            }
        })

        //updating the tempUser

        const updatedUser = await TempUserModel.findByIdAndUpdate(
            { _id: req.params.id, },
            { $set: { otp: updatedotp } },
            { new: true }   //It is used to send the modified document
        )

        await updatedUser.save();

        return res.status(200).json(updatedUser._id);

    }
    catch (err) {
        return res.status(500).json(err.message);
    }
})

/*
Route:/signup
Descript:if otp is successful create a permanent user and delete the tempUser
params: id
Access: public
Method: POST
*/

Router.post('/signup/:id', async (req, res) => {
    try {

        const { otp } = req.body.credentials;

        const user = await TempUserModel.findById(req.params.id);

        const { fullName, email, password, role, phoneNumber, address } = user;

        // console.log(fullName, email, password, role, phoneNumber);

        // console.log(user.otp);
        // console.log(otp);

        if (user.otp === otp) {
            //creating new user from TempUserModel
            const permanentUser = await UserModel.create({
                fullName: fullName,
                email: email,
                password: password,
                role: role,
                phoneNumber: phoneNumber,
                address: address
            });

            if (permanentUser) {
                //deleting the Temp user
                await TempUserModel.findByIdAndDelete(req.params.id);

                return res.status(200).json(permanentUser);
            }
        } else {
            throw new Error("Otp does not matches");
        }
    }
    catch (err) {
        return res.status(500).json(err.message);
    }
})


/*
Route:/login
Descript:Signup with email and password
params: none
Access: public
Method: POST
*/

Router.post('/login', async (req, res) => {
    try {
        const updatedEmail = req.body.credentials.email.trim();
        const user = await UserModel.findEmailandPassword({
            ...req.body.credentials,
            email: updatedEmail
        });
        if (user) {
            const token = jwt.sign(
                {
                    fullName: user.fullName,
                    email: user.email,
                    role: user.role,
                    id: user._id
                },
                secretKey,
                { expiresIn: '24h' }
            )

            // Send the response
            return res.status(200).json({ user, token });
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

/*
Route:/protected
Descript:check the validity of jwt token
params: none
Access: public
Method: post
*/

Router.post('/protected', async (req, res) => {

    const { token } = req.body.credentials;

    // console.log(req.body.credentials);

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(401).json(err);
        return res.status(200).json(user);
    })

    // return res.status(200).json("Protected route accessed successfully");

})


/*
Route:/delete/:id
Description:delete the user
params: id
Access: public
Method: delete
*/

Router.delete('/delete/:id', async (req, res) => {
    try {
        // console.log(req.params.id);
        const user = await UserModel.findById(req.params.id);
        // console.log(user);
        const email = user.email;
        // console.log(email);
        await OrderModel.deleteMany({ email: email });
        await UserModel.findByIdAndDelete(req.params.id);
        return res.status(200).json("User deleted successfully");

    } catch (err) {
        return res.status(500).json(err);
    }

})

export default Router;