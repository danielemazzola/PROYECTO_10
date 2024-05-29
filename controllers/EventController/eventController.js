const Event = require('../../models/eventModel')

const getEvents = async (req, res) => {
  const events = await Event.find().populate('created')
  return res.status(200).json({ message: 'Events', events })
}
const getEvent = async (req, res) => {
  const { _id } = req.params
  const event = await Event.findById(_id)
  if (!event) return res.status(409).json({ message: 'Event not found' })
  return res.status(200).json({ message: 'Event found', event })
}

module.exports = { getEvents, getEvent }
