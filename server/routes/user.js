const express = require('express')
const authCheck = require('../config/auth-check')
const User = require('../models/User')
const Post = require('../models/Post')

const router = new express.Router()

router.get('/details/:id', authCheck, async (req, res) => {
  const id = req.params.id
  User
    .findById(id)
    .populate('posts')
    .then(user => {
      if (!user) {
        const message = 'User not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let userPosts = user.posts.map(p => {
        p["starsCount"] = p.stars.length
        return p; 
      })
  
        return res.status(200).json({
          success: true,
          message: 'User details info.',
          user: user,
          posts: userPosts
        })
      })
        .catch((err) => {
          let message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
})

router.get('/all', async (req, res) => {
  const id = req.params.id
  User
    .find()
    .then(users => {
      if (!users) {
        const message = 'Users not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }
        return res.status(200).json({
          success: true,
          message: 'All users info.',
          users: users,
        })
      })
        .catch((err) => {
          let message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
})

router.post('/block/:id', authCheck, async (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  User
  .findById(id)
  .then(user => {
    if (!user) {
      const message = 'User not found.'
      return res.status(200).json({
        success: false,
        message: message
      })
    }
    if(req.user.roles.includes('Admin')) {
      let toggle = !user.isBlocked
      console.log(toggle)
      user.isBlocked = toggle
      console.log(user)
    }
   
      user
        .save()
        .then(async (savedUser) => {
         let user = await User
            .findById(id)
            .populate('posts');
          res.status(200).json({
            success: true,
            message: 'User recieved block/unblock action!',
            user: user,
            posts:  user.posts,
          })
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
