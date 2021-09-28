const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')
//DEV
usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })
//DEV
usersRouter.delete("/:id", async (request, response) => {
    await User.findByIdAndRemove(request.params.id)
    response.status(204).end()
  })

usersRouter.post('/', async (request, response) => {
  const body = request.body
    //CHECKS
    if (!body.password || body.password === '') {
        return response.status(400).json({ error: 'password required' })
    }
    if (body.password.length < 3) {
        return response.status(400).json({ error: 'password must be at the least 3 characters' })
    }
    if (body.username.length < 3) {
        return response.status(400).json({ error: 'Username must be at the least 3 characters' })
    }
    

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  console.log(passwordHash)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save().catch((err)=>{
      console.log(err)
      return response.status(400).json({ error: 'Username invalid' })
  })    

  response.json(savedUser)
})

module.exports = usersRouter