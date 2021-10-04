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

})
    describe('when logged in', function() {    
        beforeEach(function() {      
        cy.contains('login').click()      
        cy.get('input:first').type('mluukkai')      
        cy.get('input:last').type('salainen')      
        cy.get('#login-button').click()    
    })

    it('a new note can be created', function() {
        cy.contains('new note').click()
        cy.get('input').type('a note created by cypress')
        cy.contains('save').click()
        cy.contains('a note created by cypress')        
})
})