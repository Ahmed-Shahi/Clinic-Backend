const express = require("express")
const {handleSignUpBtn,handleGetData,handleGetDataById} = require('../Controller/Signup.Control')
const {handleLoginBtn} = require('../Controller/Login.Control')

const router = express.Router()

router.route("/users").get(handleGetData)
router.route("/users").post(handleSignUpBtn)
router.route("/login").get(handleGetData)
router.route("/login").post(handleLoginBtn)
router.route("/users/:id").post(handleGetDataById)

module.exports = router 