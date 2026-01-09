const express =  require('express');
const ensureJwt = require('../Middleware/Jwt.Middleware')
const { handleLoginDoctorBtn, handleGetDoctorData, handleGetAllPatients,handleLogoutBtn } = require('../Controller/Doctor.Control');

const router = express.Router();

router.route("/doctorlogin").get(handleGetDoctorData)
router.route("/doctorprofile/:id/logout").post(ensureJwt, handleLogoutBtn);

router.route("/doctorprofile/:id/patient").get(ensureJwt, handleGetAllPatients);

router.route("/doctorprofile/:id").get(ensureJwt, handleGetDoctorData);

router.route("/doctorlogin").post(handleLoginDoctorBtn)

module.exports = router;