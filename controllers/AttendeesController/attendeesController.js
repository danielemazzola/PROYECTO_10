const Attendees = require('../../models/attendeesModel')
const User = require('../../models/userModel')

const getAttendees = async (req, res) => {
  const attendees = await Attendees.find()
    .populate({ path: 'userId', select: 'name email' })
    .populate({ path: 'eventId', select: 'title' })
  return res.status(200).json({ message: 'Attendees', attendees })
}
const getProfileAttendees = async (req, res) => {
  const { _id } = req.params
  const user = await User.findById(_id)
    .select('name lastName email roles avatar')
    .populate({
      path: 'events',
      select: 'title description date'
    })
  if (!user) return res.status(409).json({ message: 'Attendees not found😢' })
  return res.status(200).json({ message: 'Attendees found😎', user })
}

module.exports = { getAttendees, getProfileAttendees }
