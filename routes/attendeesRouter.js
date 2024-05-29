const express = require('express')
const { isAuth } = require('../middleware/isAuth')

const {
  getAttendees,
  getProfileAttendees
} = require('../controllers/AttendeesController/attendeesController')
const ROUTER = express.Router()

ROUTER.get('/', isAuth, getAttendees) // LIST ATTENDEES CONFIRMED
ROUTER.get('/:_id', isAuth, getProfileAttendees) // ATTENDEES DETAILS

module.exports = ROUTER
