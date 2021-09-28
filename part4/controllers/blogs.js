const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const conf = require('../utils/config')



const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }

blogsRouter.post('/', async (request, response) => {
    var blog =undefined
    
    const token = request.headers.authorization
    const decodedToken = jwt.verify(token, conf.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    //const user = await User.findById(decodedToken.id)
    if (!request.body.title && !request.body.url)
        return response.status(400).json({ error: 'title and url is missing' })

   if(request.body.likes === undefined){
        blog = new Blog({
            title: request.body.title,
            author: request.body.author,
            url: request.body.url,
            likes: 0
        })
    }else{
        blog = new Blog(request.body)
    }
    const user = await User.findById(decodedToken.id)
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    console.log(user)
    user.save()
    response.set(200).json(savedBlog)
  })
  
blogsRouter.get('/:id',async  (request, response) => {
    const blog =await Blog.findById(request.params.id)
        if (blog) {
          response.json(blog.toJSON())
        } else {
          response.status(404).end()
        }

  })

blogsRouter.delete('/:id', async (request, response) => {

    const token = request.headers.authorization
    const decodedToken = jwt.verify(token, conf.SECRET)

    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)

    const user = await User.findById(decodedToken.id)
    console.log("here ",blog.id.toString(),user.blogs.toString())
    if (user.blogs.toString().match(blog.id.toString())) {
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()
      } else {
        return response.status(401).json({error: "you do not have permission to delete this blog"})
      }
})

blogsRouter.put('/:id',async  (request, response) => {
  
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
    if (updatedBlog) {
        //TODO
        response.status(200).json(updatedBlog.toJSON())
      } else {
        response.status(404).end()
      }
  })


blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
module.exports = blogsRouter