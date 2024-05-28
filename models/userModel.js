const { Timestamp } = require('mongodb')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    lastName: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    roles: {
      type: [String],
      enum: ['user', 'admin'],
      default: ['user']
    },
    avatar: {
      type: String,
      required: false,
      default:
        'https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2F312859505363637482%2F&psig=AOvVaw1xc609RSGr8ulavsUE8lpD&ust=1716909804318000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMio7MmRroYDFQAAAAAdAAAAABAE'
    },
    token: {
      type: String,
      trim: true
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event'
      }
    ]
  },
  {
    timestamps: true,
    collection: 'User'
  }
)

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  }
})

const User = mongoose.model('User', userSchema)
module.exports = User
