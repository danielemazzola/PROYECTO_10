const Event = require('../models/eventModel')
const User = require('../models/userModel')

const Authority = async (req, res, next) => {
  const { user } = req
  const { id } = req.params
  const event = await Event.findById(id)
  const isUser = await User.findById(event.creator)
  const isAdmin = user.roles.filter((val) => val === 'admin')
  if (isUser._id.toString() === user._id.toString() || isAdmin.length > 0)
    next()
  else
    return res
      .status(401)
      .json({ message: 'You do not have permission to modify this event 😑' })
}

module.exports = { Authority }
