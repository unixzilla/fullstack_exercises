const { response } = require('express')
const express = require('express')
var morgan = require('morgan')
const app = express()
app.use(express.json())

morgan.token('post-body', (request,response) => {
    return JSON.stringify(request.body)  
  })

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-body'))
let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/',(request,response)=>{
    response.send("Phone Book")
})
app.get('/api/persons',(request,response)=>{
    response.json(data)
})

app.get('/info',(request,response)=>{
    const info = `
    <p>
    Phonebook has info for ${data.length} people
    </p> 
    `
    const html = info + new Date()
   response.send(html) 
})

app.get('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    const person = data.find(data=>data.id===id)
    if(!person){
        response.status(404).end()   
    }else{
        response.json(person)
    }
})

app.delete('/api/persons/:id',(request,response)=>{
    const id = Number(request.params.id)
    data = data.filter(d => d.id!==id )
    response.status(204).end()
})

app.post('/api/persons/',(request,response)=>{
    const body = request.body
    if(!body.name){
        return response.status(400).json({
            error:'name is missing'
        })
    }
    if(data.find(d=>d.name===body.name)){
        return response.status(400).json({
            error:'name must be unique'
        })
    }
    const newData = {
        "id": generateId(),
        "name": body.name,
        "number": body.number 
    }
    data = data.concat(newData)
    response.json(newData)
})

const generateId = () => {
    const id = Math.floor(Math.random()*100000000)
    return id
}

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server started: http://localhost:${PORT}`)
})

