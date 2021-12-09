describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test1',
      username: 'test1',
      password: 'test1',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('login').click()
    cy.contains('login')
  })

  it('user can log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('test1')
    cy.get('#password').type('test1')
    cy.get('#loginButton').click()
    cy.contains('test1 logged in')
  })
  it('user cannot log in', function() {
    cy.contains('login').click()
    cy.get('#username').type('test4')
    cy.get('#password').type('test4')
    cy.get('#loginButton').click()
    cy.get('#error').contains('wrong Username or Password')
  })

})
describe('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'test1',
      password: 'test1',
    }).then((response) => {
      localStorage.setItem('User', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })
  })

  it('a new blog can be created', function() {
    cy.contains('new blog').click()
    cy.get('#titleIn').type('a blog created by cypress')
    cy.get('#authorIn').type('Crpress')
    cy.get('#urlIn').type('http://example.com')
    cy.get('#newBlogButton').click()
    cy.contains('a blog created by cypress')
  })

  it('blogs can be liked', function() {
    cy.contains('new blog').click()
    cy.get('#titleIn').type('a blog created by cypress')
    cy.get('#authorIn').type('Crpress')
    cy.get('#urlIn').type('http://example.com')
    cy.get('#newBlogButton').click()
    cy.contains('View').click()
    cy.get('#Likes').contains('0')
    cy.contains('Like').click()
    cy.get('#Likes').contains('1')
  })

  it('deleting blog', function () {
    cy.contains('new blog').click()
    cy.get('#titleIn').type('a blog created by cypress')
    cy.get('#authorIn').type('Crpress')
    cy.get('#urlIn').type('http://example.com')
    cy.get('#newBlogButton').click()
    cy.contains('View').click()
    cy.get('#remove').click()
    cy.on('windows:confirm', () => true)
  })
})
describe('And multiple blogs exist', function () {


  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username: 'test1',
      password: 'test1',
    }).then((response) => {
      localStorage.setItem('User', JSON.stringify(response.body))
      cy.visit('http://localhost:3000')
    })

    cy.createBlog({
      title: 'Testing 1',
      author: 'test',
      url: 'hexample.com',
      likes: 5,
    })
    cy.createBlog({
      title: 'Testing 2',
      author: 'test',
      url: 'example.com',
      likes: 10,
    })
    cy.createBlog({
      title: 'Testing 3',
      author: 'test',
      url: 'example.com',
      likes: 15,
    })
  })
  it('ordered by the amount of likes', function () {
    cy.get('.blogClass').should(items => {
      expect(items[0]).to.contain.text('Testing 3')
      expect(items[1]).to.contain.text('Testing 2')
      expect(items[2]).to.contain.text('Testing 1')
    })
  })
})