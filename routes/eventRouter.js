const ROUTER = require('express').Router()
const { isAuth } = require('../middleware/isAuth')
const { Authority } = require('../middleware/authority')
const { eventsImg } = require('../middleware/uploadImage')
const {
  createEvent,
  getEvents,
  getEventsAuth,
  getEvent,
  updateEvent,
  getMyEvents
} = require('../controllers/EventController/eventController')

ROUTER.get('/', getEvents) // LIST EVENTS
ROUTER.get('/my-events', isAuth, getMyEvents)
ROUTER.get('/events-auth', isAuth, getEventsAuth) // LIST EVENTS
ROUTER.get('/:id', isAuth, getEvent) // EVENT
ROUTER.post('/create-event', eventsImg.single('image'), isAuth, createEvent) //CREATE EVENTS
ROUTER.put('/:id', isAuth, Authority, eventsImg.single('image'), updateEvent) //UPDATE EVENT

module.exports = ROUTER
