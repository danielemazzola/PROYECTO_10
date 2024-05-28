const User = require('../models/userModel')
const { verifyToken } = require('../helpers/generateJWT')

const isAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ message: 'UNAUTHORAIZED' })
  try {
    const decode = verifyToken(token, process.env.JWT_KEY)
    if (req.user === null)
      return res.status(401).json({ message: 'AUTHORIZATION_ERROR' })
    req.user = await User.findById(decode.id)
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'UNAUTHORAIZED' })
  }
}

module.exports = { isAuth }
