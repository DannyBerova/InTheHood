const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

const REQUIRED_VALIDATION_MESSAGE = '{PATH} is required'

let userSchema = new mongoose.Schema({
  email: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true},
  username: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE, unique: true},
  salt: mongoose.Schema.Types.String,
  password: mongoose.Schema.Types.String,
  firstName: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  lastName: {type: mongoose.Schema.Types.String, required: REQUIRED_VALIDATION_MESSAGE},
  isBlocked: {type: mongoose.Schema.Types.Boolean, default: false},
  avatar: {type: mongoose.Schema.Types.String, default: 'https://cdn.patchcdn.com/assets/layout/contribute/user-default.png'},
  roles: [{type: mongoose.Schema.Types.String, default: 'User'}],
  posts: [{type: mongoose.Schema.Types.ObjectId, ref: 'Post'}],
})

userSchema.method({
  authenticate: function (password) {
    return encryption.generateHashedPassword(this.salt, password) === this.password
  }
})

let User = mongoose.model('User', userSchema)

module.exports = User
module.exports.seedAdminUser = () => {
  User.find({}).then(users => {
    if (users.length > 0) return

    let salt = encryption.generateSalt()
    let password = encryption.generateHashedPassword(salt, '123456')

    User.create({
      email: 'admin@admin.com',
      username: 'Admin',
      firstName: 'Admin',
      lastName: 'Adminov',
      salt: salt,
      password: password,
      avatar: 'http://proconsultancies.org/wimages/icon-user-default.png',
      roles: ['Admin', 'User']
    })
  })
}
