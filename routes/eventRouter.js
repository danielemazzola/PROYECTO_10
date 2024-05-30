const express = require('express')
const { isAuth } = require('../middleware/isAuth')
const { Authority } = require('../middleware/authority')
const { eventsImg } = require('../middleware/uploadImage')

const {
  getEvents,
  getEvent,
  updateEvent
} = require('../controllers/EventController/eventController')
const ROUTER = express.Router()

ROUTER.get('/', getEvents) // LIST EVENTS
ROUTER.get('/:_id', getEvent) // EVENT
ROUTER.put('/:_id', isAuth, Authority, eventsImg.single('image'), updateEvent)

module.exports = ROUTER
