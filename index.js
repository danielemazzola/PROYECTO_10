require('dotenv').config()
const express = require('express')
const CONNECTDB = require('./config/CONNECTDB')
const CONNECTION_CLOUDINARY = require('./config/CONNECTION_CLOUDINARY')
const APP = express()
const PORT = process.env.PORT || 4000

APP.use(express.json())
APP.use(express.urlencoded({ extended: false }))
CONNECTDB()
CONNECTION_CLOUDINARY()
const cors = require('cors')
APP.use(cors())
/******ROUTES******/
//USER
const userRouter = require('./routes/userRoutes')
APP.use('/api/auth', userRouter)

//EVENTS
const eventRouter = require('./routes/eventRouter')
APP.use('/api/events', eventRouter)

//ASSISTANT
const attendeesRouter = require('./routes/attendeesRouter')
APP.use('/api/attendees', attendeesRouter)

//ERROR URI
APP.get('*', (req, res, next) => {
  const ERROR = 'URL NOT FOUND😢'
  next(ERROR)
})
APP.use((error, req, res, next) => {
  return res.status(500).send(error)
})
/****END ROUTES****/

APP.listen(PORT, () => console.log(`SERVER RUNNIG, PORT: ${PORT}`))
