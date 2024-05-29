const express = require('express')
const { isAuth } = require('../middleware/isAuth')

const {
  getEvents,
  getEvent
} = require('../controllers/EventController/eventController')
const ROUTER = express.Router()

ROUTER.get('/', isAuth, getEvents) // LIST EVENTS
ROUTER.get('/:_id', isAuth, getEvent) // EVENT

module.exports = ROUTER
