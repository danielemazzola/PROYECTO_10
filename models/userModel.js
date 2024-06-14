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
      default: 'https://cdn-icons-png.flaticon.com/512/3541/3541871.png'
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
