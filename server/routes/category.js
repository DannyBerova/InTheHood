const express = require('express')
const authCheck = require('../config/auth-check')
const Category = require('../models/Category')

const router = new express.Router()

router.get('/', (req, res) => {
    Category
      .find()
      .then(categories => {
        res.status(200).json({categories })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :('
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  })

  module.exports = router