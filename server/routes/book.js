const express = require('express')
const authCheck = require('../config/auth-check')
const Book = require('../models/Book')

const router = new express.Router()

function validateBookCreateForm(payload) {
  const errors = {}
  let isFormValid = true
  let message = ''

  payload.price = parseFloat(payload.price)

  if (!payload || typeof payload.title !== 'string' || payload.title.length < 3) {
    isFormValid = false
    errors.name = 'Book name must be at least 3 symbols.'
  }

  if (!payload || typeof payload.description !== 'string' || payload.description.length < 10 || payload.description.length > 200) {
    isFormValid = false
    errors.description = 'Description must be at least 10 symbols and less than 120 symbols.'
  }

  if (!payload || !payload.price || payload.price < 0) {
    isFormValid = false
    errors.price = 'Price must be a positive number.'
  }

  if (!payload || typeof payload.image !== 'string' || !(payload.image.startsWith('https://') || payload.image.startsWith('http://')) || payload.image.length < 14) {
    isFormValid = false
    errors.image = 'Please enter valid Image URL. Image URL must be at least 14 symbols.'
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

router.post('/create', authCheck, (req, res) => {
  const bookObj = req.body
  if (req.user.roles.indexOf('Admin') > -1) {
    const validationResult = validateBookCreateForm(bookObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Book
      .create(bookObj)
      .then((createdBook) => {
        res.status(200).json({
          success: true,
          message: 'Book added successfully.',
          data: createdBook
        })
      })
      .catch((err) => {
        console.log(err)
        let message = 'Something went wrong :( Check the form for errors.'
        if (err.code === 11000) {
          message = 'Book with the given name already exists.'
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

router.post('/edit/:id', authCheck, (req, res) => {
  if (req.user.roles.indexOf('Admin') > -1) {
    const bookId = req.params.id
    const bookObj = req.body
    const validationResult = validateBookCreateForm(bookObj)
    if (!validationResult.success) {
      return res.status(200).json({
        success: false,
        message: validationResult.message,
        errors: validationResult.errors
      })
    }

    Book
      .findById(bookId)
      .then(existingBook => {
        existingBook.title = bookObj.title
        existingBook.author = bookObj.author
        existingBook.genres = bookObj.genres
        existingBook.description = bookObj.description
        existingBook.price = bookObj.price
        existingBook.image = bookObj.image

        existingBook
          .save()
          .then(editedBook => {
            res.status(200).json({
              success: true,
              message: 'Book edited successfully.',
              data: editedBook
            })
          })
          .catch((err) => {
            console.log(err)
            let message = 'Something went wrong :( Check the form for errors.'
            if (err.code === 11000) {
              message = 'Book with the given name already exists.'
            }
            return res.status(200).json({
              success: false,
              message: message
            })
          })
      })
      .catch((err) => {
        console.log(err)
        const message = 'Something went wrong :( Check the form for errors.'
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

router.get('/all', (req, res) => {
  Book
    .find()
    .then(books => {
      res.status(200).json(books)
    })
})

router.post('/review/:id', authCheck, (req, res) => {
  const id = req.params.id
  const review = req.body.review
  const username = req.user.username

  if (review.length < 4) {
    const message = 'Review must be at least 4 characters long.'
    return res.status(200).json({
      success: false,
      message: message
    })
  }

  Book
    .findById(id)
    .then(book => {
      if (!book) {
        return res.status(200).json({
          success: false,
          message: 'Product not found.'
        })
      }

      let reviewObj = {
        review,
        createdBy: username
      }

      let reviews = book.reviews
      reviews.push(reviewObj)
      book.reviews = reviews
      book
        .save()
        .then((book) => {
          res.status(200).json({
            success: true,
            message: 'Review added successfully.',
            data: book
          })
        })
        .catch((err) => {
          console.log(err)
          const message = 'Something went wrong :( Check the form for errors.'
          return res.status(200).json({
            success: false,
            message: message
          })
        })
    })
    .catch((err) => {
      console.log(err)
      const message = 'Something went wrong :( Check the form for errors.'
      return res.status(200).json({
        success: false,
        message: message
      })
    })
})

router.post('/like/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Book
    .findById(id)
    .then(book => {
      if (!book) {
        const message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = book.likes
      if (!likes.includes(username)) {
        likes.push(username)
      }
      book.likes = likes
      book
        .save()
        .then((book) => {
          res.status(200).json({
            success: true,
            message: 'Book liked successfully.',
            data: book
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

router.post('/unlike/:id', authCheck, (req, res) => {
  const id = req.params.id
  const username = req.user.username
  Book
    .findById(id)
    .then(book => {
      if (!book) {
        let message = 'Product not found.'
        return res.status(200).json({
          success: false,
          message: message
        })
      }

      let likes = book.likes
      if (likes.includes(username)) {
        const index = likes.indexOf(username)
        likes.splice(index, 1)
      }

      book.likes = likes
      book
        .save()
        .then((book) => {
          res.status(200).json({
            success: true,
            message: 'Product unliked successfully.',
            data: book
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

router.delete('/delete/:id', authCheck, (req, res) => {
  const id = req.params.id
  if (req.user.roles.indexOf('Admin') > -1) {
    Book
      .findById(id)
      .then((book) => {
        book
          .remove()
          .then(() => {
            return res.status(200).json({
              success: true,
              message: 'Book deleted successfully!'
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
