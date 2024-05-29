const mongoose = require('mongoose')

const attendeesSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events'
    }
  },
  {
    timestamps: true,
    collection: 'Attendees'
  }
)

const Attendees = mongoose.model('Attendees', attendeesSchema)

module.exports = Attendees
