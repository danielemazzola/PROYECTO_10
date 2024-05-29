const express = require('express')
const { profile, eventsImg } = require('../middleware/uploadImage')
const { isAuth } = require('../middleware/isAuth')
const { isConfirmedEvent } = require('../middleware/isConfirmedEvent')
const {
  create,
  recoverPassword,
  newPassword,
  login,
  events,
  attendees
} = require('../controllers/UserController/userController')
const ROUTER = express.Router()

ROUTER.post('/register', profile.single('avatar'), create) // NEW USER
ROUTER.post('/recovery', recoverPassword) // RECOVER PASSWORD
ROUTER.post('/recovery-password/:token', newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.post('/events', eventsImg.single('image'), isAuth, events) //CREATE EVENTS
ROUTER.get('/attendees/:_id', isAuth, isConfirmedEvent, attendees) // ATTENDEES CONFIRM EVENTS

module.exports = ROUTER
