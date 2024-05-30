const express = require('express')
const { profile, eventsImg } = require('../middleware/uploadImage')
const { isAuth } = require('../middleware/isAuth')
const { isConfirmedEvent } = require('../middleware/isConfirmedEvent')
const { tokenRecoveryPassword } = require('../middleware/tokenRecoveryPassword')

const {
  create,
  recoverPassword,
  newPassword,
  login
} = require('../controllers/UserController/userController')
const ROUTER = express.Router()

ROUTER.post('/register', profile.single('avatar'), create) // NEW USER
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', tokenRecoveryPassword, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN

module.exports = ROUTER
