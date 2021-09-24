const express = require('express')
//eliminating async try-catch errors
require('express-async-errors')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const userRouter = require('./controllers/user')
const loginRouter = require('./controllers/login')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const cors = require('cors')

logger.info(`connect to `,config.MONGODB_URI)
//connect MongoDB
mongoose.connect(config.MONGODB_URI)
.then(()=>{
	logger.info(`connected to db`)
})
.catch(error=>{
	logger.error('error connecting to db',error.message)
})
//middleware
app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogRouter)
app.use('/api/users',userRouter)
app.use('/api/login',loginRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
