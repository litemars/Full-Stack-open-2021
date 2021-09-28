const blogsRouter = require('express').Router()
//const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')





blogsRouter.post('/', (request, response) => {
    var blog
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
    
    
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })
  
blogsRouter.get('/:id', (request, response) => {
    Blog.findById(request.params.id)
      .then(blog => {
        if (blog) {
          response.json(blog)
        } else {
          response.status(404).end()
        }
      })
  })

blogsRouter.delete('/:id', async (request, response) => {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
})

blogsRouter.put('/:id', (request, response) => {
  
    const blog = {
      title: request.body.title,
      author: request.body.author,
      url: request.body.url,
      likes: request.body.likes,
    }
  
    Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
      .then(updatedBlog => {
        response.json(updatedBlog)
      })
  })

  
blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
module.exports = blogsRouter