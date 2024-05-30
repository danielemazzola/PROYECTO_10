const express = require('express')
const ROUTER = express.Router()
const { isAuth } = require('../middleware/isAuth')
const { isConfirmedEvent } = require('../middleware/isConfirmedEvent')
const {
  attendees,
  getAttendees,
  getProfileAttendees
} = require('../controllers/AttendeesController/attendeesController')

ROUTER.post('/:id', isConfirmedEvent, attendees) // ATTENDEES CONFIRM EVENTS - REGISTER ALL USER AND VISITES
ROUTER.get('/', isAuth, getAttendees) // LIST ATTENDEES CONFIRMED
ROUTER.get('/:id', isAuth, getProfileAttendees) // ATTENDEES DETAILS

module.exports = ROUTER
