import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    email: { type: String, required: true },
    bikeName: { type: String, required: true },
    bikeNumber: { type: String, required: true },
    servicesRequired: [{
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Services' },
        itemName: { type: String, required: true }
    }],
    totalAmount: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    serviceStatus: { type: String, required: true },
    date: { type: String, required: true }
});

export const OrderModel = mongoose.model('Orders', orderSchema);