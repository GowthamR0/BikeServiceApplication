import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String },
    phoneNumber: [{ type: Number }]
},
    {
        timestamps: true
    }
)

//static function to check the email presence in the UserModel
userSchema.statics.findEmail = async ({ email }) => {
    const user = await UserModel.findOne({ email: email });
    if (user) {
        throw new Error("email already exists");
    }
    return false;
}

//staic function used to check email and password for login
userSchema.statics.findEmailandPassword = async ({ email, password }) => {
    const user = await UserModel.findOne({ email: email });
    if (!user) throw new Error("email not found");
    const doesPwdMatch = await bcrypt.compare(password, user.password);
    if (!doesPwdMatch) throw new Error("Password does not match");
    // console.log(doesPwdMatch);
    return user;
}

export const UserModel = mongoose.model('Users', userSchema);

