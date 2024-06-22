const ROUTER = require('express').Router()
const { isAuth } = require('../middleware/isAuth')
const { isConfirmedEvent } = require('../middleware/isConfirmedEvent')
const {
  attendees,
  getAttendees,
  getProfileAttendees,
  removeAttendance
} = require('../controllers/AttendeesController/attendeesController')

ROUTER.get('/', isAuth, getAttendees) // LIST ATTENDEES CONFIRMED
ROUTER.get('/:id', isAuth, getProfileAttendees) // ATTENDEES DETAILS
ROUTER.post('/:id', isConfirmedEvent, attendees) // ATTENDEES CONFIRM EVENTS - REGISTER ALL USER AND VISITES
ROUTER.delete('/:remove', isAuth, removeAttendance) // REMOVE ATTENDEES

module.exports = ROUTER
