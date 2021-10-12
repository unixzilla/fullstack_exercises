describe('Blog app', function() {
  beforeEach(function() {
      cy.request('POST', 'http://localhost:3003/api/testing/reset')
    //create user for testing
      const user = {
          name: 'Unix',
          username: 'unix',
          password: '123456'
      }
      //POST user object to create
      cy.request('POST', 'http://localhost:3003/api/users/', user) 
      const user2 = {
          name: 'Unix 2',
          username: 'unix2',
          password: '123456'
      }
      //POST user object to create
      cy.request('POST', 'http://localhost:3003/api/users/', user2) 

    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
      cy.contains('log in to application')
      cy.contains('username')
      cy.contains('password')
  })
    describe('Login',function() {
        it('succeeds with correct credentials', function() {
            cy.get('#username').type('unix')
            cy.get('#password').type('123456')
            cy.get('#login_button').click()
            cy.contains('blogs')
            cy.contains('logged in')
        })

        it('fails with wrong credentials', function() {
            cy.get('#username').type('unix')
            cy.get('#password').type('12345')
            cy.get('#login_button').click()
            cy.contains('Wrong username or password')
            // ...
        })
    })
    describe('When logged in', function() {
        beforeEach(function() {
            // log in user here
            cy.get('#username').type('unix')
            cy.get('#password').type('123456')
            cy.get('#login_button').click()

        })

        it('A blog can be created', function() {
            cy.get('#show_button').click()
            cy.contains('create new')
            cy.get('#title').type('test title')
            cy.get('#author').type('test author')
            cy.get('#url').type('http://www.test.com')
            cy.get('#create_button').click()
            cy.contains('a new blog test title by test author added')
            cy.contains('test title test author')
            //should be hidden some contents
            cy.contains('likes 0').should('not.be.visible')
            cy.contains('http://www.test.com').should('not.be.visible')
            //click view button, show some contents
            cy.contains('view').click()
            cy.contains('likes 0').should('be.visible')
            cy.contains('http://www.test.com').should('be.visible')
            cy.get('.like-button').click()
            cy.contains('likes 1')
            // ...
        })
    })

    describe('Manage Delete Blog', function() {
        beforeEach(function() {
            //use cypress/support/commands
            cy.login({ username: 'unix', password: '123456' })
            cy.createBlog({
                title:'test title',
                author:'test author',
                url:'http://www.test.com'
            })

        })
        it('A blog can be deleted by owner',function(){
            cy.visit('http://localhost:3000')
            cy.wait(1000)
            cy.contains('view').click()
            cy.get('#remove_blog').click()
            //event window:confirm
            cy.on('window:confirm',(str) => {
                expect(str).to.eq('Remove blog test title by test author')
                return true
            })
            cy.wait(1000)
            cy.visit('http://localhost:3000')
            cy.wait(1000)
            cy.contains('test title').should('not.exist')
        })

        it('A blog cannot be deleted by other',function(){
            //Cypress command Logout remove localStorage item
            cy.logout()
            // Login other user
            cy.login({ username: 'unix2', password: '123456' })
            cy.wait(1000)
            cy.visit('http://localhost:3000')
            cy.contains('view').click()
            cy.get('#remove_blog').should('not.be.visible')
        })
    })
    describe('Check Blog likes', function() {
        beforeEach(function() {
            //use cypress/support/commands
            cy.login({ username: 'unix', password: '123456' })
            cy.createBlog({
                title:'test title',
                author:'test author',
                url:'http://www.test.com'
            })
            cy.createBlog({
                title:'test title 2',
                author:'test author 2',
                url:'http://www.test2.com'
            })
            cy.createBlog({
                title:'test title 3',
                author:'test author 3',
                url:'http://www.test3.com'
            })

        })
        it('Checks that the blogs are ordered according to likes with the blog with the most likes being first',
            function(){
                cy.visit('http://localhost:3000')
                cy.wait(1000)
                cy.get('.blog-item').then(($blog) => {
                    //JQuery .map() element
                    $blog.map((index, element) => {
                        return element
                    }).find('#show_button').trigger('click')
                })

                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 3')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 3')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 3')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 3')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 2')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title 3')").parent().find('.like-button').trigger('click')
                    //$blog.find('.like-button').trigger('click')
                })
                cy.wait(500)
                cy.get('.blog-item').then(($blog) => {
                    $blog.find("div:contains('test title test author')").parent().find("div:contains('likes 11')").css('color','red')
                })
        })
    })

})
