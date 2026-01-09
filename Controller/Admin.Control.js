const Appointment = require("../Model/Appointment.Model");
const Doctor = require("../Model/Doctor.Model");

const getAdminData = async (req, res) => {
    try {
        const doctorData = await Doctor.find();
        console.log("Doctor Data",doctorData);
        const doctorIds = doctorData.map(doctor => doctor._id.toString());
        console.log(doctorIds);
        const count = [];
        const appointmentData = await Appointment.find();
        console.log("Appointment Data",appointmentData);
        doctorIds.forEach(id => {
            const doctorAppointments = appointmentData.filter(appointment => appointment.doctorId == id);
            const finalData = doctorAppointments.map(appointment => appointment.doctorId == id)
            const lenght = finalData.length;
            count.push(lenght)
        })
        console.log(count);

        const analyticsData = [
            { name: 'Dr. Sajjad Ali', patients: count[0] },
            { name: 'Dr. Faisal', patients: count[1] },
            { name: 'Dr. Hatim', patients: count[2] },
        ]

        return res.json(analyticsData)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAdminData
};