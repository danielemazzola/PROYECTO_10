const mongoose = require('mongoose')

const CONNECTDB = async () => {
  try {
    await mongoose.connect(process.env.CONNECT_DDBB)
    console.log(`
    **     **  ******   **      **  ******   ******
    ***   *** **    **  ***     ** **    ** **    **
    **** ****/**      * ****    **/**      /**      *
    ** *** **/**      * ** **   **/**      /**      *
    **     **/**      * **  **  **/** *****/**      *
    **     ** **    **  **   ** **/**    ** **    **
    **     **  ******   **    ****  *******  ****** 
`)
  } catch (error) {
    console.log(error)
  }
}
module.exports = CONNECTDB
