const express = require('express')
const {
  getAttendees,
  getProfileAttendees
} = require('../controllers/AttendeesController/attendeesController')
const ROUTER = express.Router()

ROUTER.get('/', getAttendees) // LIST ATTENDEES CONFIRMED
ROUTER.get('/:_id', getProfileAttendees) // ATTENDEES DETAILS

module.exports = ROUTER
