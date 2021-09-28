const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/user')
const errorHandler = require('./utils/ErrorHandler')
//const morgan = require('morgan')

//const mongoUrl = process.env.MONGODB_URI 

const mongoUrl = 'mongodb+srv://fullstack1:fullstack1@cluster0.f9mfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

//morgan.token('json', function (req, res) { if (req.method === 'POST') return JSON.stringify(req.body) })
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.use(cors())
app.use(express.json())

app.use('/api/login',loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(errorHandler.errorHandler)
app.use(errorHandler.unknownEndpoint)
module.exports=app