const PassportLocalStrategy = require('passport-local').Strategy
const User = require('../models/User')
const encryption = require('../utilities/encryption')

module.exports = new PassportLocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, username, password, done) => {
  console.log(username)
  const user = {
    email: username.trim(),
    password: password.trim(),
    username: req.body.username.trim()
  }

  User
    .find({username: username})
    .then(users => {
      if (users.length > 0) {
        return done('E-mail already exists!')
      }

      user.salt = encryption.generateSalt()
      user.password = encryption.generateHashedPassword(user.salt, user.password)
      user.roles = []

      User
        .create(user)
        .then(() => {
          return done(null)
        })
        .catch(() => {
          return done('Something went wrong :( Check the form for errors.')
        })
    })
})
