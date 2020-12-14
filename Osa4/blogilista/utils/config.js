require('dotenv').config()
const process = require('process')

let MONGODB_URI = process.env.MONGODB_URI
let PORT = process.env.PORT

module.exports = {
  MONGODB_URI,
  PORT
}