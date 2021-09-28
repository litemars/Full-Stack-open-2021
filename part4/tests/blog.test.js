const mongoose = require('mongoose')
const supertest = require('supertest')
const { response, resource } = require('../app')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')




test("Blogs are returned as json",async()=>{

    await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type',/application\/json/)
    
})

test("Testing /api/blogs",async()=>{

    const newBlog1 = {
        title: 'Alabama',
        author: 'Me',
        url: 'http://alabama.com',
        likes: 2
      }
    let response=await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type',/application\/json/)
    console.log(response.body.length)
    let response2=await api
            .post('/api/blogs')
            .send(newBlog1)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    expect(response2.body.length===response.body.length+1)
})
test('Blog unique ID', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

test('Default 0 like', async () => {
    const newBloglikes = {
        title: 'Chicago',
        author: 'Rudolf',
        url: 'http://chicago.com'
      }
    let response= await api
        .post('/api/blogs')
        .send(newBloglikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

})
test('Missing title and url', async () => {

    const newBlogMissing = {
        author: 'Rudolf',
      }
      await api
      .post('/api/blogs')
      .send(newBlogMissing)
      .expect(400)

})
afterAll(()=>{
    mongoose.connection.close()
})