const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')




test("Blogs are returned as json",async()=>{
    await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type',/application\/json/)
    
})

test("Testing /api/blogs",async()=>{

    const newUser={
        username:"test1",
        password:"test1"
    }

    const createUser1 = await api
    .post('/api/login')
    .send(newUser)
    .expect('Content-Type', /application\/json/)

    const newBlog1 = {
        title: 'Alabama',
        author: 'Me',
        url: 'http://alabama.com',
        likes: 2
      }

    let response = await api
        .get("/api/blogs")
        .expect(200)
        .expect('Content-Type',/application\/json/)
        
    let response2 = await api
            .post('/api/blogs')
            .send(newBlog1)
            .set('Authorization',createUser1.body.token)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    expect(response2.body.length===response.body.length+1)
})
test('Blog unique ID', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })

test('Default 0 like', async () => {

    const newUser2={
        username:"test20",
        password:"test20"
    }
    const createUser = await api
    .post('/api/login')
    .send(newUser2)
    .expect('Content-Type', /application\/json/)

    const newBloglikes = {
        title: 'Chicago',
        author: 'Rudolf',
        url: 'http://chicago.com'
      }

    let response= await api
        .post('/api/blogs')
        .set('Authorization',createUser.body.token)
        .send(newBloglikes)
        .expect(200)
        .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)

})
test('Missing title and url', async () => {

    const newUser2={
        username:"test20",
        password:"test20"
    }
    const createUser = await api
    .post('/api/login')
    .send(newUser2)
    .expect('Content-Type', /application\/json/)

    const newBlogMissing = {
        author: 'Rudolf'
      }
      await api
      .post('/api/blogs')
      .set('Authorization',createUser.body.token)
      .send(newBlogMissing)
      .expect(400)

})
afterAll(()=>{
    mongoose.connection.close()
})