const express = require('express')
const app = express()
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
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
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
