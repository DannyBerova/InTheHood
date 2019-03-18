const express = require('express')
const authCheck = require('../config/auth-check')
const User = require('../models/User')
const Post = require('../models/Post')
const Category = require('../models/Category')

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

router.get('/all',authCheck, async (req, res) => {
  const id = req.params.id
  if(req.user.roles.includes('Admin')) {
    
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
  } else {
    return res.status(200).json({
      success: false,
      message: "Not authorized!"
    })
  }
})

router.post('/block/:id', authCheck, async (req, res) => {
  const id = req.params.id
  const userId = req.user.id
  if(req.user.roles.includes('Admin')) {
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
      user.isBlocked = toggle
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
  } else {
    return res.status(200).json({
      success: false,
      message: "Not authorized!"
    })
  }
  
})

router.delete('/destroy/:id', authCheck, async (req, res) => {
  try {
    const id = req.params.id
    let userToDestroy = await User
       .findById(id)
       if(req.user.id === userToDestroy.id) {
        let posts = await Post.find({createdBy: userToDestroy._id})
      
        //remove posts from categories and remove posts from db
        let categories = await Category.find();
        for (const cat of categories) {
          let postsCat = cat.posts;
          for (const post of posts) {
            if(cat.posts.some(p => p.toString() === post._id.toString())) {
              let idx = cat.posts.indexOf(post._id)
              postsCat = postsCat.filter(p => p.toString() !== post._id.toString());
            
            }
          }
          cat.posts = postsCat;
          let catEdited = await cat.save()
        }
        
        let deleted = await Post.deleteMany({createdBy: userToDestroy._id})
  
        if(deleted) {
          let userDeleted = await User.findByIdAndDelete(id);
          return res.status(200).json({
            success: true,
            message: 'User destroyed!!!.',
            user: userToDestroy,
          })
        } else {
          return res.status(200).json({
            success: false,
            message: 'Error!!!.',
          })
        }
      } else {
        return res.status(200).json({
          success: false,
          message: "Not authorized!"
        })
      }
    } catch (err) {
      console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
        return res.status(200).json({
          success: false,
          message: message
        })
    }
})

module.exports = router
