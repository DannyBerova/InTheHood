const mongoose = require('mongoose')
const User = require('../models/User')
const Category = require('../models/Category')

mongoose.Promise = global.Promise

module.exports = (settings) => {
  mongoose.connect(settings.db, {
    useCreateIndex: true,
    useNewUrlParser: true
    })
  let db = mongoose.connection

  db.once('open', err => {
    if (err) {
      throw err
    }
    console.log('MongoDB ready!')
    User.seedAdminUser()
    Category.seedCategory()
  })
  db.on('error', err => console.log(`Database error: ${err}`))
}
