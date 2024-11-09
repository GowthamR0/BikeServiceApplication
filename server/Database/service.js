import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    itemName: { type: String, required: true },
    brand:{ type: String, required: true},
    itemDescription: { type: String, required: true },
    price: { type: String, required: true}
},
    {
        timestamps: true
    }
);

export const ServiceModel = mongoose.model('Services', serviceSchema);