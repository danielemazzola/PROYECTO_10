const mongoose = require('mongoose')

const attendeesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Events'
    }
  ]
})

const Attendees = mongoose.model('Attendees', attendeesSchema)

module.exports = Attendees
