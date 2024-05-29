const Event = require('../../models/eventModel')
const { deleteImg } = require('../../middleware/deleteImage')

const getEvents = async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: 'created',
      select: 'name lastName email roles avatar'
    })
    return res.status(200).json({ message: 'Events', events })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again.' })
  }
}
const getEvent = async (req, res) => {
  const { _id } = req.params
  try {
    const event = await Event.findById(_id).populate({
      path: 'created',
      select: 'name lastName email roles avatar'
    })
    if (!event) return res.status(409).json({ message: 'Event not found' })
    return res.status(200).json({ message: 'Event found', event })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again.' })
  }
}
const updateEvent = async (req, res) => {
  const { user } = req
  const { _id } = req.params
  try {
    const event = await Event.findById(_id)
    if (!event) return res.status(404).json({ message: 'Event not found' })
    if (req.file) {
      await deleteImg(event.image)
      req.body.image = req.file.path
    }
    const updateEvent = await Event.findByIdAndUpdate(
      _id,
      { $set: req.body },
      { new: true }
    )
    if (!event) return res.status(404).json({ message: 'Event not found' })
    return res.status(201).json({ message: 'Event update', updateEvent })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again.' })
  }
}

module.exports = { getEvents, getEvent, updateEvent }
