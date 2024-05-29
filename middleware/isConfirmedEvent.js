const Attendees = require('../models/attendeesModel')
const isConfirmedEvent = async (req, res, next) => {
  const { user } = req
  const { _id } = req.params
  const confirmed = await Attendees.find().where('userId').equals(user._id)
  const filterConfirmed = confirmed?.filter(
    (val) => val.eventId.toString() === _id.toString()
  )
  if (filterConfirmed.length > 0) {
    return res
      .status(201)
      .json({ message: 'You have already confirmed this event previously😉' })
  } else {
    next()
  }
}
module.exports = { isConfirmedEvent }
