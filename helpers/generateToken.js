const generateToken = () => {
  const token = Math.floor(100 + Math.random() * 900)
  return token
}

module.exports = { generateToken }
