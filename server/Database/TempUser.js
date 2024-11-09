import mongoose from "mongoose";

const tempUserSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String },
    phoneNumber: [{ type: Number }],
    otp: { type: String, required: true }
},
    {
        timestamps: true
    }
)

//TimeToLive index creation for document deletion
tempUserSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3600 });


export const TempUserModel = mongoose.model('TempUsers', tempUserSchema);