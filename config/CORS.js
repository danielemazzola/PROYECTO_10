const express = require('express')
const APP = express()
const cors = require('cors')
const CORS = () => {
  const whitelist = [process.env.FRONTEND_URL_IP]
  const corsOption = {
    origin: function (origin, callback) {
      if (whitelist.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error('Error de CORS'))
      }
    }
  }
  APP.use(cors(corsOption))
}
module.exports = CORS
