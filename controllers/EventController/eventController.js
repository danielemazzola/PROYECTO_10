const Event = require('../../models/eventModel')
const { deleteImg } = require('../../middleware/deleteImage')
const User = require('../../models/userModel')
const { newEventEmail } = require('../../helpers/emails/sendEmails')

const createEvent = async (req, res) => {
  const { user } = req
  console.log(req.file.path)
  try {
    const event = new Event(req.body)
    event.image = req.file.path
    event.creator = user._id
    await event.save()
    newEventEmail({ user, event })
    await User.updateOne({ _id: user._id }, { $push: { events: event._id } })
    const newEvent = await Event.findById(event._id).populate({
      path: 'creator',
      select: 'name lastName email avatar roles'
    })
    return res
      .status(200)
      .json({ message: 'Event create successfully🤩', newEvent })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().select('-attendees').populate({
      path: 'creator',
      select: 'name lastName email roles avatar'
    })

    return res.status(200).json({ message: 'Events', events })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const getEventsAuth = async (req, res) => {
  const { user } = req
  try {
    const isAdmin = user.roles.includes('admin')

    let events = await Event.find().populate({
      path: 'creator',
      select: 'name lastName email roles avatar'
    })
    let creator = events.map((val) => val.creator)
    /* let eventCreator = creator.map((val) => val._id) */
    if (isAdmin) {
      events = await Event.populate(events, {
        path: 'attendees',
        select: 'name lastName email'
      })
    } else {
      events = events.map((event) => ({
        ...event.toObject(),
        attendees: event.attendees.length
      }))
    }
    return res.status(200).json({ message: 'Events', events })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const getEvent = async (req, res) => {
  const { id } = req.params
  try {
    const event = await Event.findById(id)
      .populate({
        path: 'creator',
        select: 'name lastName email roles avatar'
      })
      .populate({
        path: 'attendees',
        select: 'name lastName email'
      })
    if (!event) return res.status(409).json({ message: 'Event not found' })
    return res.status(200).json({ message: 'Event found', event })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const updateEvent = async (req, res) => {
  const { user } = req
  const { id } = req.params
  try {
    const isAdmin = user.roles.includes('admin')

    const event = await Event.findById(id)

    if (!event) return res.status(404).json({ message: 'Event not found' })
    if (req.file) {
      await deleteImg(event.image)
      req.body.image = req.file.path
    }
    let updateEvent = await Event.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).populate('creator')
    if (!updateEvent)
      return res.status(404).json({ message: 'Event not found' })

    if (isAdmin) {
      updateEvent = await updateEvent.populate({
        path: 'attendees',
        select: 'name lastName email'
      })
    } else {
      updateEvent.attendees = updateEvent.attendees.length
    }

    return res.status(201).json({ message: 'Event update', updateEvent })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const getMyEvents = async (req, res) => {
  const { user } = req
  try {
    const events = await Event.find()
      .where('creator')
      .equals(user._id)
      .populate('attendees')
    if (!events)
      return res
        .status(409)
        .json({ message: 'You not have any events created😑' })
    else return res.status(201).json({ message: 'My Events❤️', events })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

module.exports = {
  createEvent,
  getEvents,
  getEventsAuth,
  getEvent,
  updateEvent,
  getMyEvents
}
