const authRoutes = require('../routes/auth')
const bookRoutes = require('../routes/book')
const categoryRoutes = require('../routes/category')
const postRoutes = require('../routes/post')
const userRoutes = require('../routes/user')
const ordersRoutes = require('../routes/order')

module.exports = (app) => {
  app.use('/auth', authRoutes)
  app.use('/book', bookRoutes)
  app.use('/category', categoryRoutes)
  app.use('/post', postRoutes)
  app.use('/user', userRoutes)
  app.use('/orders', ordersRoutes)
}
