describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jane Blogger',
      username: 'jblogger',
      password: 'password'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('shows login form', function() {
    cy.contains('log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('jblogger')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Jane Blogger logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('jblogger')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('html').should('not.contain', 'Jane Blogger logged in')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'jblogger', password: 'password' })
    })

    it('A blog can be created', function() {
      cy.contains('new note').click()
      cy.get('#title').type('React patterns')
      cy.get('#author').type('Michael Chan')
      cy.get('#url').type('https://reactpatterns.com/')
      cy.get('#create-button').click()
      cy.get('.notification')
        .should('contain', 'a new blog React patterns by Michael Chan added')
        .and('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.blog')
        .should('contain', 'React patterns Michael Chan')
    })
  })
})