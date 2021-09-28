const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const conf = require('./utils/config')
//const morgan = require('morgan')

const mongoUrl = conf.MONGODB_URI 

mongoose.connect(mongoUrl)

//morgan.token('json', function (req, res) { if (req.method === 'POST') return JSON.stringify(req.body) })
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.use(cors())
app.use(express.json())

app.use('/api/login',loginRouter)
app.use('/api/blogs', blogsRouter)
app.use('/api/users', usersRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknownEndpoint)
app.use(middleware.tokenExtractor)
app.use(middleware.userExtractor)
module.exports=app