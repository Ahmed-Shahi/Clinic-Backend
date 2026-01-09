const mongoose = require("mongoose")

const mySchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
}, { timestamps: true })


const SignUp = mongoose.model("users", mySchema)

module.exports = SignUp