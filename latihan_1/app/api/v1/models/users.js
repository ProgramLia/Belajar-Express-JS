const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const userSchema = new Schema({
    username: {
        type: String,
        default: "",
    },
    email: {
        type: String,
        unique: true,
        lowecase:true,
        required:true,
    },
    password: {
        required: true,
        type: String,
        minLenght: 6,
    },
    image: {
        type: String,
        default: "",
    },
    role :{
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    otp: {
        type: Number,
        required: true,
    },
    is_verified: {
        type: Boolean,
        default: false,
    }
},{
    timestamps: true
})

module.exports = model("User", userSchema)