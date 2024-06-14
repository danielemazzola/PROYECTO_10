const ROUTER = require('express').Router()
/* const { profile } = require('../middleware/uploadImage') */
const { tokenRecoveryPassword } = require('../middleware/tokenRecoveryPassword')
const {
  create,
  recoverPassword,
  newPassword,
  login,
  profile
} = require('../controllers/UserController/userController')
const { isAuth } = require('../middleware/isAuth')

ROUTER.post('/register', create) // NEW USER
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', tokenRecoveryPassword, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN
ROUTER.post('/profile', isAuth, profile) // PROFILE USER

module.exports = ROUTER
