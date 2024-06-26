const Attendees = require('../../models/attendeesModel')
const Event = require('../../models/eventModel')
const { confirmEvent } = require('../../helpers/emails/sendEmails')
const User = require('../../models/userModel')

const registerAttendees = async (req, res) => {
  let user = {}
  const { id } = req.params
  const { name, lastName, email } = req.body
  if ([name, lastName, email].includes(''))
    return res.status(409).json({ message: 'All fields are required😢' })
  try {
    let event = await Event.findById(id)
    if (!event) return res.status(409).json({ message: 'Event not found😢' })
    const attendence = new Attendees({
      name: name,
      lastName: lastName,
      email: email,
      eventId: id
    })
    await attendence.save()
    event = await Event.findByIdAndUpdate(
      id,
      {
        $push: { attendees: attendence._id }
      },
      { new: true }
    )
    user = { name, lastName, email }

    //SEND EMAIL
    confirmEvent({ user, event })

    return res
      .status(200)
      .json({ message: `Event ${event.title} confirmed🥳`, attendence })
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
  let attendance = {}
  try {
    const attendees = await Attendees.findById(id).populate({
      path: 'eventId',
      select: 'title description date'
    })
    if (!attendees)
      return res.status(409).json({ message: 'Attendees not found😢' })
    const user = await User.findOne({ email: attendees.email })
      .populate('events')
      .select('-password')
    if (user) {
      attendance = {
        ...user.toObject(),
        attendance: attendees
      }
      console.log(attendance)
    } else {
      attendance = attendees.toObject()
    }
    return res.status(200).json({ message: 'Attendance found😎', attendance })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const removeAttendance = async (req, res) => {
  const { remove } = req.params

  try {
    const attendee = await Attendees.findById(remove)
    if (!attendee) {
      return res.status(409).json({ message: 'Attendee not found 😢' })
    }
    const { eventId } = attendee
    const removeAttendance = await Attendees.findByIdAndDelete(remove)
    if (!removeAttendance) {
      return res.status(409).json({ message: 'Attendees not found😢' })
    }
    const updateListAttendancesEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        $pull: { attendees: remove }
      },
      { new: true }
    )
    if (!updateListAttendancesEvent) {
      return res.status(409).json({ message: 'Event not found 😢' })
    }
    return res.status(200).json({
      message: `Event: ${updateListAttendancesEvent.title} cancelled💔`
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = {
  registerAttendees,
  getAttendees,
  getProfileAttendees,
  removeAttendance
}
