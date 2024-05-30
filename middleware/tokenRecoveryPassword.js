const User = require('../models/userModel')
const tokenRecoveryPassword = async (req, res, next) => {
  const { token } = req.params
  try {
    const user = await User.findOne({ token })
    if (!user)
      return res
        .status(404)
        .json({ message: 'Token not found, please login😉' })
    else next()
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: 'Ups, there was a problem, please try again😑' })
  }
}
module.exports = { tokenRecoveryPassword }
