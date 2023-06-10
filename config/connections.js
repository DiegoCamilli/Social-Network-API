const { connect, connection } = require('mongoose')

const connectionString =
  process.env.MONGODB_URI || 'mongodb+srv://DiegoCamilli:passqord@cool-hw-api.gm4wd40.mongodb.net/'

connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

module.exports = connection