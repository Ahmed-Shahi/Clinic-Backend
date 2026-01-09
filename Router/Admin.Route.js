const express = require("express");
const { getAdminData } = require("../Controller/Admin.Control");

const router = express.Router();

router.route("/admin").get(getAdminData)

module.exports = router;