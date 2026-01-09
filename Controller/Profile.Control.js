const Doctor = require("../Model/Doctor.Model");
const SignUp = require("../Model/Users.Model")
const Appointment = require("../Model/Appointment.Model")
const { sendAppointmentEmail } = require("../utils/sendmail");

const handleGetData = async (req, res) => {
    try {
        const path = req.path
        const userId = path.split('/')[2]
        console.log("ID:", userId);


        const allData = await SignUp.find({})
        const onlyLogin = await SignUp.find({ _id: userId })
        console.log('Only Login', onlyLogin);
        return res.json({
            onlyLogin,
            allData,
        })
    } catch (error) {
        res.send(error.Message)
    }
}


const handleLogoutBtn = async (req, res) => {
    const path = req.path
    console.log('logout path', path);
    const userId = path.split('/')[2]
    console.log(userId);
    const userData = await SignUp.find({ _id: userId })
    console.log(userData);


    res.clearCookie(`Token_${userId}`, {
        httpOnly: true,
        secure: false,   // true in production (HTTPS)
        sameSite: "lax"  // or "none" if cross-site
    });
    res.json({ message: "Logged out successfully" });
}

const handleGetAllDoctor = async (req, res) => {
    try {
        const allDoctors = await Doctor.find({})
        console.log(allDoctors);
        return res.json({ allDoctors })
    } catch (error) {
        console.log(error);
    }
}
const handleGetDoctor = async (req, res) => {
    try {
        const docId = req.path.split('/')[3]
        console.log(docId);
        const docData = await Doctor.findById(docId)
        console.log('docData', docData);
        return res.json({ docData })
    } catch (error) {
        console.log(error);
    }
}

const handleBookBtn = async (req, res) => {
    try {
        const { form } = await req.body
        const path = await req.path
        const userId = path.split('/')[2]
        console.log(form);
        const doctorId = await Doctor.findOne({ name: form.doctor })
        console.log('Doctor ID:', doctorId._id);
        Appointment.create({
            userId: userId,
            patientName: form.patientName,
            gender: form.gender,
            age: form.age,
            phone: form.phone,
            email: form.email,
            doctor: form.doctor,
            doctorId: doctorId._id,
            date: form.date,
            time: form.time,
            disease: form.disease
        })
        console.log("Save in Database");
        await sendAppointmentEmail({
            to: form.email,
            name: form.patientName,
            doctor: form.doctor,
            date: form.date,
            time: form.time
        });
        res.send({ mes: "Appointment has been Book" })

    } catch (error) {
        return res.json({ Message: "Server Error" })
    }

}

const handleGetAllAppointments = async (req, res) => {
    try {
        const allAppointments = await Appointment.find({})
        const drJohnDoe = await Appointment.find({ doctor: "Dr. John Doe" });
        const drJohnDoetimes = drJohnDoe.map(app => app.time);
        const drJohnDoedates = drJohnDoe.map(app => app.date);
        console.log(drJohnDoetimes, drJohnDoedates);

        const DrJaneSmith = await Appointment.find({ doctor: "Dr. Jane Smith" });
        const drJaneSmithtimes = DrJaneSmith.map(app => app.time);
        const drJaneSmithdates = DrJaneSmith.map(app => app.date);
        console.log(drJaneSmithtimes, drJaneSmithdates);

        const DrMichaelWatson = await Appointment.find({ doctor: "Dr. Michael Watson" });
        const drMichaelWatsontimes = DrMichaelWatson.map(app => app.time);
        const drMichaelWatsondates = DrMichaelWatson.map(app => app.date);
        console.log(drMichaelWatsontimes, drMichaelWatsondates);

        return res.json({
            allAppointments,
            drJohnDoetimes,
            drJohnDoedates,
            drJaneSmithtimes,
            drJaneSmithdates,
            drMichaelWatsontimes,
            drMichaelWatsondates
        })
    } catch (error) {
        console.log(error.message);
    }

}
module.exports = {
    handleGetData,
    handleLogoutBtn,
    handleGetAllDoctor,
    handleGetDoctor,
    handleBookBtn,
    handleGetAllAppointments,

}