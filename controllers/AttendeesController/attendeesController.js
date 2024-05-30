const Attendees = require('../../models/attendeesModel')
const Event = require('../../models/eventModel')
const { confirmEvent } = require('../../helpers/emails/sendEmails')

const attendees = async (req, res) => {
  let user = {}
  const { id } = req.params
  const { name, lastName, email } = req.body
  try {
    const event = await Event.findById(id)
    if (!event) return res.status(409).json({ message: 'Event not found😢' })
    const attendence = new Attendees({
      name: name,
      lastName: lastName,
      email: email,
      eventId: id
    })
    await attendence.save()
    await Event.findByIdAndUpdate(id, { $push: { attendees: attendence._id } })
    user = { name, lastName, email }
    confirmEvent({ user, event })
    return res.status(200).json({ message: 'Event confirmed🥳' })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const getAttendees = async (req, res) => {
  try {
    const attendees = await Attendees.find().populate({
      path: 'eventId',
      select: 'title'
    })
    return res.status(200).json({ message: 'Attendees', attendees })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const getProfileAttendees = async (req, res) => {
  const { id } = req.params
  try {
    const attendees = await Attendees.findById(id).populate({
      path: 'eventId',
      select: 'title description date'
    })
    if (!attendees)
      return res.status(409).json({ message: 'Attendees not found😢' })
    return res.status(200).json({ message: 'Attendees found😎', attendees })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

module.exports = { attendees, getAttendees, getProfileAttendees }
