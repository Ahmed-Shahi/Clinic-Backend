const express = require("express")
const ensureJwt = require('../Middleware/Jwt.Middleware')
const { handleGetData,
    handleLogoutBtn,
    handleGetAllDoctor,
    handleGetDoctor,
    handleBookBtn,
    handleGetAllAppointments, } = require('../Controller/Profile.Control')
const router = express.Router()


router.route('/profile/:id').get(ensureJwt, handleGetData);
router.route("/profile/:id/logout").post(handleLogoutBtn);

// Doctor related routes
router.route("/profile/:id/doctors").get(ensureJwt, handleGetAllDoctor);

// Appointment CRUD
router.route("/profile/:id/appointments").post(ensureJwt, handleBookBtn);
router.route("/profile/:id/appointments").get(ensureJwt, handleGetAllAppointments);

// Dynamic route should come last
router.route("/profile/:id/:docId").get(ensureJwt, handleGetDoctor);

module.exports = router 
