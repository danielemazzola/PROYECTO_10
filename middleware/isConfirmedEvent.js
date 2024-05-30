const Attendees = require('../models/attendeesModel')
const Event = require('../models/eventModel')
const isConfirmedEvent = async (req, res, next) => {
  const { email } = req.body
  const { _id } = req.params
  const event = await Event.findById(_id)
  if (!event) return res.status(409).json({ message: 'Event not found' })
  const attendees = await Attendees.find().where('eventId').equals(_id)
  const userAssist = attendees?.filter((val) => val.email === email)
  if (userAssist.length) {
    return res
      .status(201)
      .json({ message: 'You have already confirmed this event previously😉' })
  } else {
    next()
  }
}
module.exports = { isConfirmedEvent }
