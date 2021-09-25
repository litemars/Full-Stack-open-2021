
const express = require('express')
var bodyParser = require('body-parser')
var morgan = require('morgan')
const app =express()
//morgan.token('json', function (req, res) {  if(req.method==='POST') return JSON.stringify(req.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))
let phone = [
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


app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  phone = phone.filter(p => p.id !== id)
  response.status(204).end()
})

app.get('/api/persons',(request, response) => {
  response.json(phone)
})


app.post('/api/persons',(request,response)=>{
  const new_el = bodyParser.json(request.body)
  console.log(new_el)
  const person = ({
    name: new_el.name,
    number: new_el.number,
    id: Math.floor(Math.random() * 100000)
})

  // CONTROL
  if(!request.body.name){
    response.status(400)
    return response.json({error: 'need a name'}).end()
  } 
  if(!request.body.number){
    response.status(400)
    return response.json ({error: 'need a number'}).end()
  }
  if(phone.find(p => p.name === body.name)){
    response.status(400)
    return response.json({error: 'need a unique name'}).end()
  }
  ///

    phone.push(person)
    response.status(204).end()
})

app.get('/api/persons/:id',(request, response) => {
  const id = Number(request.params.id)
  const person = phone.find(p => p.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.get('/info',(request,response)=>{
  let num_phone=phone.length
  response.send('<div>Phonebook has info for ' + num_phone + ' people</div><div>' + new Date() + '</div>')
})

const PORT = 3001
app.listen(PORT,()=>
console.log(`Server running on port ${PORT}`))