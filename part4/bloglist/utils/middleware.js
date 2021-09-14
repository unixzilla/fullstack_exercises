const logger = require('./logger')

const requestLogger = (request, response, next) => {

	logger.info('Method:',request.method)
	logger.info('Path:',request.path)
	logger.info('Body:',request.body)
	logger.info('----')
	//next for request handler..
	next()

}

//after request handler
const unknownEndpoint = (request,response) => {
	response.status(404).send({error:'unknown endpoint'})	
	//stop
}

const errorHandler = (error,request,response,next) => {
	logger.error(error.message)

	//check error name and handle it 
	if(error.name==='CastError'){
		//Request params ID format not supported.
		response.status(400).send({error:'malformatted id'})	
		//stop
	}else if(error.name==='ValidationError'){
		// Mongoose Schema Validation Error
		response.status(400).json({error:error.message})
		//stop
	}

	//no handler matched, pass to next middleware or send the error to client 
	next(error)
}


module.exports = {
	requestLogger,
	unknownEndpoint,
	errorHandler
}
