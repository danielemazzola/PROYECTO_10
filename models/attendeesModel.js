const mongoose = require('mongoose')

const attendeesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true
    },
    lastName: {
      type: String,
      require: true
    },
    email: {
      type: String,
      require: true
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }
  },
  {
    timestamps: true,
    collection: 'Attendees'
  }
)

const Attendees = mongoose.model('Attendees', attendeesSchema)

module.exports = Attendees
