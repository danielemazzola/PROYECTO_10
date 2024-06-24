const ROUTER = require('express').Router()
const { isAuth } = require('../middleware/isAuth')
const { isConfirmedEvent } = require('../middleware/isConfirmedEvent')
const {
  registerAttendees,
  getAttendees,
  getProfileAttendees,
  removeAttendance
} = require('../controllers/AttendeesController/attendeesController')

ROUTER.get('/', isAuth, getAttendees) // LIST ATTENDEES CONFIRMED
ROUTER.get('/:id', isAuth, getProfileAttendees) // ATTENDEES DETAILS
ROUTER.post('/:id', isConfirmedEvent, registerAttendees) // ATTENDEES CONFIRM EVENTS - REGISTER ALL USER AND VISITES
ROUTER.delete('/:remove', isAuth, removeAttendance) // REMOVE ATTENDEES

module.exports = ROUTER
