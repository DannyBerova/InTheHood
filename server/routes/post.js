const express = require('express')
const authCheck = require('../config/auth-check')
const Book = require('../models/Book')
const Post = require('../models/Post')
const User = require('../models/User')
const Category = require('../models/Category')
var mongoose = require('mongoose');

const router = new express.Router()

function validatePostCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''


  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3 || payload.title.length > 50) {
    isFormValid = false
    errors.title = 'Post title must be at least 3 symbols and less than 50 symbols.'
  }

  if (!payload || typeof payload.content !== 'string' || payload.content.length < 10 || payload.content.length > 1024) {
    isFormValid = false
    errors.content = 'Content must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.createdBy || typeof payload.createdBy !== 'string') {
    isFormValid = false
    errors.createdBy = 'CreatedBy needs valid user ID.'
  }

  // if (!payload || typeof payload.imageUrl !== 'string' || !(payload.imageUrl.startsWith('https://') || payload.imageUrl.startsWith('http://')) || payload.imageUrl.length < 14) {
  //   isFormValid = false
  //   errors.imageUrl = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
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

router.post('/create', authCheck, async (req, res) => {
  const postObj = req.body
  if (req.user.roles.indexOf('User') > -1) {
    const validationResult = validatePostCreateForm(postObj)
    var user = req.user;
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "There is no user with these credentials"
      })
    }
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    let postToCreate = postObj;
    if(!postToCreate.imageUrl) {
      postToCreate.imageUrl = "https://www.union.edu/files/union-marketing-layer/201803/picture.jpg";
    }
    let category = await Category.findOne({name:postObj.category});
    postToCreate.category = category.name;
    let categoryDefault = await Category.findOne({name: 'info'});
    if(!postToCreate.category || postToCreate.category === '') {
      postToCreate.category = categoryDefault.name
    }
    
    Post
    .create(postToCreate)
    .then(async (createdPost) => {
      res.status(200).json({
        success: true,
        message: 'Post added successfully.',
        data: createdPost
      })
      user.posts.push(createdPost._id);
      await user.save();
      let categoryF = await Category.findById(category._id);
        await categoryF.posts.push(createdPost._id);
        await categoryF.save();
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Post with the given name already exists.'
        }
        return res.status(200).json({
          success: false,
          message: message
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.post('/edit/:id', authCheck, async (req, res) => {
  if (req.user.roles.indexOf('User') > -1) {
    const postId = req.params.id;
    const postBody = req.body;
    let postObj = postBody;
    if(!postObj.imageUrl) {
      postObj.imageUrl = "https://www.union.edu/files/union-marketing-layer/201803/picture.jpg";
    }
    let category = await Category.findOne({name:postObj.category});
    postObj.category = category.name;
    const validationResult = validatePostCreateForm(postObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }
    try {
      let existingPost = await Post.findById(postId)
      if (existingPost && existingPost.category !== postObj.category) {
        let prevCategory = await Category.findOne({name: existingPost.category})
        prevCategory.posts = prevCategory.posts.filter(p => p !== existingPost._id)
        await prevCategory.save();

        let currCategory = await Category.findOne({name: postObj.category})
        prevCategory.posts = prevCategory.posts.push(existingPost._id)
        await currCategory.save();
      }


      existingPost.title = postObj.title
      existingPost.content = postObj.content
      existingPost.imageUrl = postObj.imageUrl
      existingPost.category = postObj.category

      existingPost
        .save()
        .then(editedPost => {
          res.status(200).json({
            success: true,
            message: 'Post edited successfully.',
            data: editedPost
          })
        })
        .catch((err) => {
          console.log(err)
          let message = 'Something went wrong :( Check the form for errors.'
          if (err.code === 11000) {
            message = 'Post with the given name already exists.'
          }
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    } catch (error) {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    }
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

router.get('/', (req, res) => {
  Post
    .find()
    .populate('createdBy')
    
    .then(posts => {
      posts = posts.filter(p => p.createdBy.isBlocked === false)
      res.status(200).json({posts})
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

router.get('/latest', (req, res) => {
  Post
    .find()
    .then(posts=> {
      let latestPost = posts.sort((a, b) =>{
        return a.createdOn < b.createdOn})[0]
      res.status(200).json(latestPost)
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

router.get('/details/:id', (req, res) => {
  const id = req.params.id
  Post
  .findById(id)
  .populate('createdBy')
  .then(post => {
    if (!post) {
      const message = 'Post not found.'
      return res.status(200).json({
        success: false,
        message: message
      })
    }

    return res.status(200).json({
        success: true,
        message: 'Post details info.',
        post: post,
        createdBy: post.createdBy,
        starsCount: post.stars.length,
        stars: post.stars,
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

router.post('/star/:id', authCheck, async (req, res) => {
  const id = req.params.id
  const userId = req.user.id

  Post
  .findById(id)
  .then(post => {
    if (!post) {
      const message = 'Post not found.'
      return res.status(200).json({
        success: false,
        message: message
      })
    }
    
    let stars = post.stars;
    let message = '';
    if (stars.includes(userId)) {
      const index = stars.indexOf(req.user.id)
      stars.splice(index, 1)
      message = 'Post unstar successfully.'
    } else {
      stars.push(userId)
      message = 'Post recieved star successfully.'    
    }
      post.stars = stars
      post
        .save()
        .then(async (likedPost) => {
         let user = await User.findById(likedPost.createdBy._id)
          res.status(200).json({
            success: true,
            message: message,
            post: likedPost,
            createdBy:  user,
            starsCount: likedPost.stars.length,
            stars: likedPost.stars,
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

router.delete('/remove/:id', authCheck, async (req, res) => {
  const id = req.params.id;
  const creator = req.body.creatorId;
  var user = await User.findById(creator);
  if (req.user.roles.indexOf('User') > -1 || req.user.roles.indexOf('Admin') > -1) {
    Post
    .findById(id)
    .then(async (post) => {
      let postTitle = post.title;
      try {
        let category = await Category.findOne({name: post.category});
        let filtered =category.posts.filter(p => p.toString() !== id.toString());
        category.posts = filtered
        await category.save();
        let filteredPosts =user.posts.filter(p => p.toString() !== id.toString());
        user.posts = filteredPosts
        await user.save();
        //remove from categories and users!!!
        
      } catch (error) {
        console.log(error)
      }
      
      let creatorPossible = req.user._id;
      if (creatorPossible.toString() === post.createdBy.toString() || req.user.roles.includes('Admin')) {
        Post
        .findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json({
              success: true,
              message: `Post "${postTitle}" deleted successfully!`
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

        }

      })
      .catch(() => {
        return res.status(200).json({
          success: false,
          message: 'Entry does not exist!'
        })
      })
  } else {
    return res.status(200).json({
      success: false,
      message: 'Invalid credentials!'
    })
  }
})

module.exports = router