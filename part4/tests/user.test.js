const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

test('Testing password', async () => {

    await api.post('/api/users').send({
        "username": "MAXXXXXXXXXXXXXXXXXXXXXXXXXX", 
        "password": "1"
    }).expect(400)
})

test('Testing username', async () => {

    await api.post('/api/users').send({
        "username": "F", 
        "password": "MaXXXXXXXXXXXXXXXxxxx"
    }).expect(400)
})

test('New user', async () => {

    await api.post('/api/users').send({
        "username": "MassimoCavLl", 
        "password": "Massimo"
    }).expect(200)
})