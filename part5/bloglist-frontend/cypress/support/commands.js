// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login',({ username,password }) => { 
    cy.request('POST', 'http://localhost:3000/api/login',{
        username,password
    }).then(({ body }) => {
        localStorage.setItem('loggedNoteappUser', JSON.stringify(body))
    })
})
Cypress.Commands.add('logout',() => {
    localStorage.removeItem('loggedNoteappUser')
    cy.visit('http://localhost:3000')
})
Cypress.Commands.add('createBlog',({ title, author, url }) => {
    cy.request({method:'POST',
        url:'http://localhost:3003/api/blogs',
        auth: {
            bearer: JSON.parse(localStorage.getItem('loggedNoteappUser')).token
        },
        body: {
            title,
            author,
            url
        }})
})


