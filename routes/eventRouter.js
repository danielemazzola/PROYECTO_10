const ROUTER = require('express').Router()
const { isAuth } = require('../middleware/isAuth')
const { Authority } = require('../middleware/authority')
const { eventsImg } = require('../middleware/uploadImage')
const {
  events,
  getEvents,
  getEventsAuth,
  getEvent,
  updateEvent
} = require('../controllers/EventController/eventController')

ROUTER.post('/create-event', eventsImg.single('image'), isAuth, events) //CREATE EVENTS
ROUTER.get('/', getEvents) // LIST EVENTS
ROUTER.get('/events-auth', isAuth, getEventsAuth) // LIST EVENTS
ROUTER.get('/:id', getEvent) // EVENT
ROUTER.put('/:id', isAuth, Authority, eventsImg.single('image'), updateEvent)

module.exports = ROUTER
