const express = require('express')
const authCheck = require('../config/auth-check')
const Post = require('../models/Post')
const Comment = require('../models/Comment')

const router = new express.Router()

function validateCommentCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''


  if (!payload || typeof payload.content !== 'string' || payload.content.length < 3 || payload.content.length > 400) {
    isFormValid = false
    errors.content = 'Content must be at least 3 symbols and less than 400 symbols.'
  }

  if (!payload || !payload.createdBy || typeof payload.createdBy !== 'string') {
    isFormValid = false
    errors.createdBy = 'CreatedBy needs valid user ID.'
  }

  if (!payload || !payload.postId || typeof payload.postId !== 'string') {
    isFormValid = false
    errors.createdBy = 'CreatedBy needs valid post ID.'
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

router.post('/create', authCheck, async (req, res) => {
  const commentObj = req.body
  if (req.user.roles.indexOf('User') > -1) {
    const validationResult = validateCommentCreateForm(commentObj)
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

    let commentToCreate = commentObj;
    
    let postCommented = await Post.findById(commentObj.postId);
    commentToCreate.postId = postCommented._id;
    
    Comment
    .create(commentToCreate)
    .then(async (createdComment) => {
      res.status(200).json({
        success: true,
        message: 'Comment added successfully.',
        data: createdComment
      })
        await postCommented.comments.push(createdComment.id);
        await postCommented.save();
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

router.get('/allByPost/:id', (req, res) => {
    let postId = req.params.id
  Comment
    .find({postId: postId})    
    .then(comments => {
      res.status(200).json({comments: comments})
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
  const creator = req.body.creator;
  if (req.user.username === creator || req.user.username === 'Admin') {
      Comment
      .findById(id)
      .then(async (comment) => {
          try {
              let post = await Post.findOne({_id: comment.postId});
              let filtered =post.comments.filter(c => c.toString() !== id.toString());
              post.comments = filtered
              await post.save();
            } catch (error) {
                console.log(error)
            }
        Comment
        .findByIdAndDelete(id)
        .then(() => {
            return res.status(200).json({
              success: true,
              message: `Comment deleted successfully!`
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