describe('The Login Page', function () {
  beforeEach(function () {
    // reset and seed the database prior to every test
    // cy.exec('npm run db:reset && npm run db:seed')

    // // seed a user in the DB that we can control from our tests
    // // assuming it generates a random password for us
    // cy.request('POST', '/test/seed/user', { username: 'jane.lane' })
    //   .its('body')
    //   .as('currentUser')
  });

  it('sets auth cookie when logging in via form submission', function () {
    // destructuring assignment of the this.currentUser object
    // const { email, password } = this.currentUser
    const email = "victor.dmdb@gmail.com";
    const password = "b0ringp@ssword";

    cy.visit('/login')

    cy.get('[data-cy=emailField]').type(email)

    // {enter} causes the form to submit
    cy.get('[data-cy=passwordField]').type(`${password}{enter}`)

    // we should be redirected to /dashboard
    cy.url().should('include', '/dashboard')

    // our auth cookie should be present
    cy.getCookie('authToken').should('exist')
    cy.getCookie('session').should('exist')

    // UI should reflect this user being logged in
    // cy.get('h1').should('contain', 'jane.lane')
  })
});