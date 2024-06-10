const ROUTER = require('express').Router()
/* const { profile } = require('../middleware/uploadImage') */
const { tokenRecoveryPassword } = require('../middleware/tokenRecoveryPassword')
const {
  create,
  recoverPassword,
  newPassword,
  login
} = require('../controllers/UserController/userController')

ROUTER.post('/register', create) // NEW USER
ROUTER.post('/recovery-password', recoverPassword) // RECOVER PASSWORD
ROUTER.put('/recovery-password/:token', tokenRecoveryPassword, newPassword) // RECOVER PASSWORD
ROUTER.post('/login', login) // LOGIN

module.exports = ROUTER
