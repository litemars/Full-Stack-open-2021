const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')
const Blog = require('./models/blog')
//const morgan = require('morgan')
/*
const mongoUrl = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

*/
const mongoUrl = 'mongodb+srv://fullstack1:fullstack1@cluster0.f9mfy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
mongoose.connect(mongoUrl)

//morgan.token('json', function (req, res) { if (req.method === 'POST') return JSON.stringify(req.body) })
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms :json'))

app.use(cors())
app.use(express.json())


app.use('/api/blogs', blogsRouter)

module.exports=app