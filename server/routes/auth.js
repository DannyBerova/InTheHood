const express = require('express')
const passport = require('passport')
const validator = require('validator')
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const encryption = require('../utilities/encryption');

const router = new express.Router()

function validateSignupForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  if (!payload || typeof payload.username !== 'string' || payload.username.length < 4 || payload.username.length > 30) {
    isFormValid = false
    errors.username = 'Username must be at least 4 symbols and less than 30 symbols.'
  }

  if (!payload || typeof payload.firstName !== 'string' || payload.firstName.length < 2 || payload.firstName.length > 30) {
    isFormValid = false
    errors.firstName = 'First name must be at least 2 symbols and less than 30 symbols.'
  }

  if (!payload || typeof payload.lastName !== 'string' || payload.lastName.length < 2 || payload.lastName.length > 30) {
    isFormValid = false
    errors.lastName = 'Last name must be at least 2 symbols and less than 30 symbols.'
  }

  if (!payload || typeof payload.email !== 'string' || !validator.isEmail(payload.email)) {
    isFormValid = false
    errors.email = 'Please provide a correct email address'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length < 6) {
    isFormValid = false
    errors.password = 'Password must be at least 6 characters long'
  }

  // if (!payload || typeof payload.avatar !== 'string' || !validator.isURL(payload.avatar)) {
  //   isFormValid = false
  //   errors.avatar = 'Please provide a correct avatar URL address'
  // }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

function validateLoginForm (payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  
 

  if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
    isFormValid = false
    errors.username = 'Please provide your email address.'
  }

  if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
    isFormValid = false
    errors.password = 'Please provide your password.'
  }

  if (!isFormValid) {
    message = 'Check the form for errors.'
  }

  return {
    success: isFormValid,
    message,
    errors
  }
}

router.post('/signup', (req, res, next) => {
  const validationResult = validateSignupForm(req.body)
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }
  
    const {  username, password,email, firstName, lastName, avatar } = req.body;
    const salt = encryption.generateSalt();
    const hashedPassword = encryption.generateHashedPassword(salt, password);
    let userData = {
      username,
      email,
      firstName,
      lastName,
      password: hashedPassword,
      salt,
      roles: ['User'],
      message: 'User successfully signed and logged in!'
    }

    if(avatar){
      userData.avatar = avatar
    }
    User.create(userData)
      .then((user) => {
        const token = jwt.sign({ 
          username: user.username,
          userId: user._id.toString()
        }
        , 's0m3 r4nd0m str1ng'
        , { expiresIn: '12h' });
    
         res.status(200).json(
           { 
             message: 'User successfully created and logged in!', 
             token, 
             userId: user._id.toString(),
             username: user.username,
             isAdmin: user.roles.indexOf('Admin') !== -1,
             roles: user.roles
           });
    })
    .catch((err) => {
      console.log(err)
      let message = 'Something went wrong :( Check the form for errors.'
      if (err.code === 11000) {
        message = 'User or email already taken.'
      }
      return res.status(200).json({
        success: false,
        message: message
      })
    });
}),

router.post('/login', (req, res, next) => {
  const validationResult = validateLoginForm(req.body)
  let username = req.body.username
  let password = req.body.password
  if (!validationResult.success) {
    return res.status(200).json({
      success: false,
      message: validationResult.message,
      errors: validationResult.errors
    })
  }

  User.findOne({ username })
  .then((user) => {
    if (!user) {
      const error = new Error('Invalid credentials!');
      error.statusCode = 401;
      return res.status(401).json({
        success: false,
        message: error.message,
        errors: error
      })
    }

    if(!user.authenticate(password)) {
      const error = new Error('Invalid credentials!');
      error.statusCode = 401;
      return res.status(401).json({
        success: false,
        message: error.message,
        errors: error
      })
      // throw error;
    }

    const token = jwt.sign({ 
      username: user.username,
      userId: user._id.toString()
    }
    , 's0m3 r4nd0m str1ng'
    , { expiresIn: '12h' });

     res.status(200).json(
       { 
         message: 'User successfully logged in!', 
         token, 
         userId: user._id.toString(),
         username: user.username,
         isAdmin: user.roles.indexOf('Admin') !== -1,
         roles: user.roles
       });
  })
  .catch(error => {
    if (!error.statusCode) {
      console.log(error)
      error.statusCode = 500;
    }

    next(error);
  })
})

module.exports = router
