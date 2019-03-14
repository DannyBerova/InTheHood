const authRoutes = require('../routes/auth')
const categoryRoutes = require('../routes/category')
const postRoutes = require('../routes/post')
const userRoutes = require('../routes/user')
const commentRoutes = require('../routes/comment')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/category', categoryRoutes)
  app.use('/post', postRoutes)
  app.use('/user', userRoutes)
  app.use('/comment', commentRoutes)
}
