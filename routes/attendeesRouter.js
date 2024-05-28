const express = require('express')
const ROUTER = express.Router()

ROUTER.get('/') // LIST ATTENDEES CONFIRMED
ROUTER.get('/:_id') // ATTENDEES DETAILS

module.exports = ROUTER
