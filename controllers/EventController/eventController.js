const Event = require('../../models/eventModel')

const getEvents = async (req, res) => {
  const events = await Event.find().populate({
    path: 'created',
    select: 'name lastName email roles avatar'
  })
  return res.status(200).json({ message: 'Events', events })
}
const getEvent = async (req, res) => {
  const { _id } = req.params
  const event = await Event.findById(_id).populate({
    path: 'created',
    select: 'name lastName email roles avatar'
  })
  if (!event) return res.status(409).json({ message: 'Event not found' })
  return res.status(200).json({ message: 'Event found', event })
}
const updateEvent = async (req, res) => {
  const { user } = req
  const { _id } = req.params
}

module.exports = { getEvents, getEvent, updateEvent }
