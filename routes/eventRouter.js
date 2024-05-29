const express = require('express')
const { isAuth } = require('../middleware/isAuth')
const { Authority } = require('../middleware/authority')

const {
  getEvents,
  getEvent,
  updateEvent
} = require('../controllers/EventController/eventController')
const ROUTER = express.Router()

ROUTER.get('/', isAuth, getEvents) // LIST EVENTS
ROUTER.get('/:_id', isAuth, getEvent) // EVENT
ROUTER.put('/:_id', isAuth, Authority, updateEvent)

module.exports = ROUTER
