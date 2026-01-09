const express = require('express')
const {handleGetReview} = require('../Controller/Bot.Control')

const router = express.Router()


router.route('/bot').post(handleGetReview)

module.exports = router