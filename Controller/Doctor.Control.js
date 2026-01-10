const Doctor = require("../Model/Doctor.Model");
const Appointment = require("../Model/Appointment.Model");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const handleLoginDoctorBtn = async (req, res) => {
    const { doctorName, password } = req.body;
    try {
        const doctor = await Doctor.findOne({ name: doctorName })
        if (!doctor) {
            return res.status(400).json({ Message: "Doctor Not Found!!!" });
        }
        else {
            console.log('doctorLogin', doctor);
            bcrypt.compare(password, doctor.password, async function (err, result) {
                if (!result) {
                    return res.status(200).json({ Message: "Password Incorrect!!" });
                }
                else {
                    const token = jwt.sign(
                        {
                            name: doctorName,
                            password: doctor.password
                        },
                        process.env.JWT_TOKEN,
                        { expiresIn: "3h" }
                    );
                    res.cookie(`Token_${doctor._id}`, token, {
                        httpOnly: true,
                        secure: true,
                        sameSite: "lax"
                    });
                    res.status(200).json({ doctor, token })
                }
            });
        }
    } catch (error) {
        return res.json({ Message: "Server Error" })
    }
}

const handleGetDoctorData = async (req, res) => {
    try {
        const { id } = req.params;
        const allDoctors = await Doctor.find({})
        const onlyLogin = await Doctor.findById(id)
        console.log(onlyLogin, allDoctors);
        return res.json({ onlyLogin, allDoctors })
    } catch (error) {
        res.send(error.Message)
    }
}

const handleGetAllPatients = async (req, res) => {
    try {
        const { id } = req.params;
        const allPatients = await Appointment.find({ doctorId: id })
        console.log('All Patients:', allPatients);
        return res.json(allPatients)
    } catch (error) {
        console.log(error);
    }
}

const handleLogoutBtn = async (req, res) => {
    const path = req.path
    console.log('logout path', path);
    const doctorId = path.split('/')[2]
    console.log(doctorId);
    const userData = await Doctor.find({ _id: doctorId })
    console.log(userData);


    res.clearCookie(`Token_${doctorId}`, {
        httpOnly: true,
        secure: false,   // true in production (HTTPS)
        sameSite: "lax"  // or "none" if cross-site
    });
    res.json({ message: "Logged out successfully" });
}
module.exports = { handleLoginDoctorBtn, handleGetDoctorData, handleGetAllPatients, handleLogoutBtn };