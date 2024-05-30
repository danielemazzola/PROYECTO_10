const bcrypt = require('bcrypt')
const User = require('../../models/userModel')
const Event = require('../../models/eventModel')
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
      .json({ message: 'Ups, there was a problem, please try again😑' })
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
      .json({ message: 'Ups, there was a problem, please try again😑' })
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
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
const newPassword = async (req, res) => {
  const { token } = req.params
  try {
    const user = await User.findOne({ token })
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
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}

module.exports = {
  create,
  recoverPassword,
  newPassword,
  login
}
