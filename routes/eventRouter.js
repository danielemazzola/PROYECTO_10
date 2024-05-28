const express = require('express')
const {
  getEvents,
  getEvent
} = require('../controllers/EventController/eventController')
const ROUTER = express.Router()

ROUTER.get('/', getEvents) // LIST EVENTS
ROUTER.get('/:_id', getEvent) // EVENT

module.exports = ROUTER
