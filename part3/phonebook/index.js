require('dotenv').config()
const Person = require('./models/person')
const express = require('express')
const cors = require('cors')
var morgan = require('morgan')
const app = express()
//parse request JSON
app.use(express.json())
//support CORS
app.use(cors())
//read Frontend React build folder
app.use(express.static('build'))
//Logs
morgan.token('post-body', (request) => {
  return JSON.stringify(request.body)  
})
//Logs
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))

//Route
app.get('/api/persons',(request,response)=>{
  //find all documents from the Person collection
  Person.find({}).then(persons=>{
    console.log(persons)
    response.json(persons)
  })
})

app.get('/info',(request,response)=>{
  //find all documents from the Person collection
  Person.find({}).then(persons=>{
    const info = `
    <p>
    Phonebook has info for ${persons.length} people
    </p> 
    `
    const html = info + new Date()
    response.send(html) 
  })
})

app.get('/api/persons/:id',(request,response)=>{
//use findById instead of use find({})an object expressing search conditions.
  Person.findById(request.params.id).then(person=>{
    if(!person){
      response.status(404).end()   
    }else{
      console.log(':id',request.params)
      response.json(person)
    }
  })
})

app.delete('/api/persons/:id',(request,response,next)=>{
  Person.findByIdAndRemove(request.params.id)
    .then(()=>{
      response.status(204).end()
    })
    .catch(error=>next(error))
})

app.put('/api/persons/:id',(request,response,next)=>{

<<<<<<< HEAD
    const body = request.body
    const newData = {
        "name": body.name,
        "number": body.number 
    }
    Person.findByIdAndUpdate(request.params.id,newData,{new:true,runValidators: true})
        .then(result=>{
            response.json(result)
        })
        .catch(error=>next(error))

})
app.post('/api/persons/',(request,response,next)=>{
    const body = request.body
    const newData = new Person({
        "name": body.name,
        "number": body.number 
    })
    newData.save()
        .then(person=>response.json(person))
        .catch(error=>next(error))
=======
  const body = request.body
  const newData = {
    'name': body.name,
    'number': body.number 
  }

  Person.findByIdAndUpdate(request.params.id,newData,{new:true})
    .then(result=>{
      response.json(result)
    })
    .catch(error=>next(error))

})
app.post('/api/persons/',(request,response)=>{
  const body = request.body
  if(!body.name){
    return response.status(400).json({
      error:'name is missing'
    })
  }
  const newData = new Person({
    'name': body.name,
    'number': body.number 
  })
  newData.save().then(person=>{
    response.json(person)
  })
    .catch(()=>{
      console.log('save error')
    })
>>>>>>> c258e82474a65656302e1f36fed9cc378cba3418
})

//Middleware
const unknownEndpoint = (request,response) => {
  response.status(404).send({error:'unknown endpoint'})
}
app.use(unknownEndpoint)

const errorHandler = (error,request,response,next) => {
<<<<<<< HEAD
    console.error(error.message)
    if(error.name==='CastError'){
        return response.status(400).send({error:'malformatted id'})
    }
    if(error.name === 'ValidationError'){
       return response.status(400).json({error:error.message})
    }
    next(error)
=======
  console.error(error.message)
  if(error.name==='CastError'){
    return response.status(400).send({error:'malformatted id'})
  }
  next(error)
>>>>>>> c258e82474a65656302e1f36fed9cc378cba3418
}
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT,()=>{
  console.log(`Server is running on: http://localhost:${PORT}`)
})

