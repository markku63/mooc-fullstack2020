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
})