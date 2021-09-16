const http = require('http')
//express app
const app = require('./app') 
const config = require('./utils/config')
const logger = require('./utils/logger')

//create http server and set the Express app to the server
const server = http.createServer(app)

//start the http server
server.listen(config.PORT,()=>{
	logger.info(`Server is running on port ${config.PORT}`)
})
