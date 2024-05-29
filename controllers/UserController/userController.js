const bcrypt = require('bcrypt')
const User = require('../../models/userModel')
const Event = require('../../models/EventModel')
const Attendees = require('../../models/attendeesModel')
const { generateJWT } = require('../../helpers/generateJWT')
const { generateToken } = require('../../helpers/generateToken')
const { deleteImg } = require('../../middleware/deleteImage')
const {
  newUserEmail,
  recoverEmail,
  newPasswordEmail,
  newEventEmail,
  confirmEvent
} = require('./helpers/sendEmails')

const create = async (req, res, next) => {
  const { email } = req.body
  try {
    const duplicate = await User.findOne({ email })
    if (duplicate) {
      deleteImg(req.file.path)
      return res
        .status(409)
        .json({ message: 'Existing user, please try to log in😊' })
    }
    const user = new User(req.body)
    user.avatar = req.file.path
    await user.save()
    newUserEmail(user)
    return res
      .status(201)
      .json({ message: 'User registered successfully😉', user })
  } catch (error) {
    if (req.file) deleteImg(req.file.path)
    console.log(error)
    return res
      .status(201)
      .json({ message: 'Ups, there was a problem, please try again.' })
  }
}
const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (bcrypt.compareSync(password, user.password)) {
      const token = generateJWT(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(409).json({ message: 'Conflict with password' })
    }
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again.' })
  }
}
const recoverPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.token = generateToken()
    await user.save()
    await recoverEmail(user)
    return res.status(200).json({
      message:
        'We have sent a message to your inbox, please follow the password recovery instructions😊'
    })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again.' })
  }
}
const newPassword = async (req, res) => {
  const { token } = req.params
  try {
    const user = await User.findOne({ token })
    if (!user)
      return res
        .status(404)
        .json({ message: 'Token not found, please login😉' })
    const { password } = req.body
    user.password = password
    user.token = ''
    await user.save()
    await newPasswordEmail(user)
    return res
      .status(200)
      .json({ message: 'Password changed, please log in😍' })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again.' })
  }
}
const events = async (req, res) => {
  const { user } = req
  try {
    const existUser = await User.findById(user._id)
    const event = new Event(req.body)
    event.image = req.file.path
    event.created = user._id
    await event.save()
    newEventEmail({ user, event })
    await User.updateOne({ _id: user._id }, { $push: { events: event._id } })
    const newEvent = await Event.findById(event._id).populate({
      path: 'created',
      populate: {
        path: 'events',
        model: 'Event'
      }
    })
    return res
      .status(200)
      .json({ message: 'Event create successfully🤩', newEvent })
  } catch (error) {
    console.log(error)
  }
}
const attendees = async (req, res) => {
  const { user } = req
  const { _id } = req.params
  const event = await Event.findById(_id)
  if (!event) return res.status(409).json({ message: 'Event not found😢' })
  const confirmed = await Attendees.find().where('userId').equals(user._id)
  const filterConfirmed = confirmed?.filter(
    (val) => val.eventId.toString() === _id.toString()
  )
  if (filterConfirmed.length > 0)
    return res
      .status(201)
      .json({ message: 'You have already confirmed this event previously😉' })
  const attendeenses = new Attendees({
    userId: user._id,
    eventId: _id
  })
  await attendeenses.save()
  confirmEvent({ user, event })
  return res.status(200).json({ message: 'Event confirmed🥳' })
}

module.exports = {
  create,
  recoverPassword,
  newPassword,
  login,
  events,
  attendees
}
