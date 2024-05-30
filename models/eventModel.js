const mongoose = require('mongoose')

const eventSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: false,
      default:
        'https://www.v3rtice.com/wp-content/uploads/2021/06/organizacion-de-eventosblog-v3rtice-1.jpg'
    },
    date: {
      type: Date,
      required: true
    },
    location: {
      type: String,
      required: true
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    attendees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendees'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'Event'
  }
)

const Event = mongoose.model('Event', eventSchema)
module.exports = Event
