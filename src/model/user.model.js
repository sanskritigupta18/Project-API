import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    apikey:
    {
        type: String,
        index: true,
        unique: true,
    },
    email:
    {
        type: String,
        required: true,
        unique: true,
        lowercase:true,
        trim: true,
    },
    projects:
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        }
    ],
    password:
    {
        type: String,
        required: [true,"Password is required"],
    },
    refreshToken:
    {
        type: String,
    },
},{timestamps: true});

userSchema.pre("save",async function(next)
{
    // why we used function instead of arrow function because arrow function does not have this content and funtion has this context

    if(!this.isModified("password"))
    {
        return next();
        // if this was not here the password will be saved each time there is somechanges occur in the user
    }
    this.password = await bcrypt.hash(this.password,10);
    next();
});

userSchema.methods.isPasswordCorrect = async function(password)
{
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateAccessToken = function()
{
    return  jwt.sign(
        {
            _id: this._id,
            email: this.email,
            apikey: this.email,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateRefreshToken = function()
{
    return  jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User",userSchema);