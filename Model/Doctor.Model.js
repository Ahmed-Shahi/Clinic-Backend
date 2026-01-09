const mongoose = require("mongoose")

const mySchema = new mongoose.Schema({
    name: {
        type: String,
    },
    designation: {
        type: String,
    },
    specialty: {
        type: String,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
    }
}, { timestamps: true })


const Doctor = mongoose.model("doctors", mySchema)

module.exports = Doctor