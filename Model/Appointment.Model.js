const mongoose = require("mongoose")

const mySchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    patientName: {
        type: String,
    },
    gender: {
        type: String,
    },
    age: {
        type: Number,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    doctor: {
        type: String,
    },
    doctorId: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    disease: {
        type: String,
    },
}, { timestamps: true })


const Appointment = mongoose.model("appointments", mySchema)

module.exports = Appointment