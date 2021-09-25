const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
//test app API 
const api = supertest(app)
//helper for demo data
const helper = require('./test_helper')

const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
////////////////////////////
//before the test prepare 
////////////////////////////
beforeEach(async ()=>{
  //reset all 
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('123456',10)
  const newUser = new User({
    username:'unix',
    name:'Root',
    passwordHash
  })
  await newUser.save()

  await Blog.deleteMany({})

  //insert all test data to DB
  for(let blog of helper.blogs){
    blog.user = newUser._id 
    const newPost = new Blog(blog)
    await newPost.save()
    newUser.blogs = newUser.blogs.concat(newPost._id)
    await newUser.save()
  }

},10000)
//set(10000) longer time out
describe('when there is initially one user in db',()=>{

  beforeEach(async ()=>{
    //reset all 
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('123456',10)
    const newUser = new User({
      username:'unix',
      name:'Root',
      passwordHash
    })
    await newUser.save()
  },10000)

  test('login as root', async ()=>{
    const login = {
      username:'unix',
      password:'123456'
    }
    const logged = await api.post('/api/login')
      .send(login)
      .expect(200)
      .expect('Content-Type',/application\/json/)
  
    expect(logged.body.username).toContain(login.username)
    //decode token {username,id}
    console.log(logged.body)
    const decodedToken = jwt.verify(logged.body.token,process.env.SECRET)
    expect(decodedToken.username).toContain(login.username)
  },100000)

  test('login as root and wrong password', async ()=>{
    const login = {
      username:'root',
      password:'secret1'
    }
    await api.post('/api/login')
      .send(login)
      .expect(401)

  })
  test('creation succeeds with a fresh username',async ()=>{
    const usersAsStart = await helper.userInDb()
    const newUser = {
      username:'unixc',
      name:'Unix',
      password:'Hash'
    }
    await api.post('/api/users/')
      .send(newUser)
      .expect(200)
      .expect('Content-Type',/application\/json/)


    const userAsEnd = await helper.userInDb()
    expect(userAsEnd).toHaveLength(usersAsStart.length+1)
    const usernames = userAsEnd.map(u=>u.username)
    expect(usernames).toContain(newUser.username)

  })


  test('creation fails with proper statuscode and message if username already taken',async ()=>{
    const userAsStart = await helper.userInDb()
    const newUser = {
      username:'unix',
      name:'Root',
      password:'secret'
    }

    const result = await api.post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const userAsEnd = await helper.userInDb()
    expect(userAsEnd).toHaveLength(userAsStart.length)

  })

  test('creation fails with proper status code and message, username must be at least 3 characters',async ()=>{

    const userAsStart = await helper.userInDb()
    const newUser = {
      username:'no',
      password:'123456'
    }
    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)

    expect(result.body.error).toContain('User validation failed: username: Path `username`')
    const userAsEnd = await helper.userInDb()
    expect(userAsEnd).toHaveLength(userAsStart.length)
  })

  test('creation fails with proper status code and message, password must be at least 3 characters',async ()=>{

    const userAsStart = await helper.userInDb()
    const newUser = {
      username:'nonoo',
      password:'12'
    }
    const result = await api.post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type',/application\/json/)

    expect(result.body.error).toContain('User validation failed: password: Path `password`')
    const userAsEnd = await helper.userInDb()
    expect(userAsEnd).toHaveLength(userAsStart.length)
  })
})
//4.8 check get URL
test('the blog list application returns the correct amount of blog posts in the JSON format.',async ()=>{
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)

  expect(response.body).toHaveLength(helper.blogs.length)
},10000)
//set(10000) longer time out

//4.9 check object properties exist
test('the unique identifier property of the blog posts is named id',async ()=>{
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(response.body[0].id).toBeDefined()

})
//4.10 create new post
test('making an HTTP POST request to create a new blog post',async () => {
  const newPost = {
    title: 'test react patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  }
  //login user
  const login = {
    username:'unix',
    password:'123456'
  }
  
  const logged = await api.post('/api/login')
    .send(login)
    .expect(200)
    .expect('Content-Type',/application\/json/)

  //construct authorization token 
  const token = `bearer ${logged.body.token}`
  await api
    .post('/api/blogs')
    .set('Authorization',token)
    .send(newPost)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  const postAtEnd = await helper.blogInDb()
  expect(postAtEnd).toHaveLength(helper.blogs.length+1)
  const titles = postAtEnd.map(p=>p.title) 
  expect(titles).toContain('test react patterns')


},100000)
//4.11 try create post that missing property filled default value
test('if the likes property is missing from the request',async () =>{
  const newPost = {
    title: 'test react patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }

  //login user
  const login = {
    username:'unix',
    password:'123456'
  }
  
  const logged = await api.post('/api/login')
    .send(login)
    .expect(200)
    .expect('Content-Type',/application\/json/)

  //construct authorization token 
  const token = `bearer ${logged.body.token}`

  const blogPost = await api.post('/api/blogs')
    .set('Authorization',token)
    .send(newPost)
    .expect(201)
    .expect('Content-Type',/application\/json/)

  expect(blogPost.body.likes).toEqual(0)

})

//4.12 try create post that missing required properties
test('if the title and url properties are missing from the request data',async ()=>{
  const newPost = {
    author: 'Michael Chan'
  }

  //login user
  const login = {
    username:'unix',
    password:'123456'
  }
  
  const logged = await api.post('/api/login')
    .send(login)
    .expect(200)
    .expect('Content-Type',/application\/json/)

  //construct authorization token 
  const token = `bearer ${logged.body.token}`
  await api.post('/api/blogs')
    .set('Authorization',token)
    .send(newPost)
    .expect(400)
})

//4.13 delete
test('deleting a single blog post resource',async ()=>{
  const blogPosts = await helper.blogInDb()
  const deleteFirstPost = blogPosts[0]
  //login user
  const login = {
    username:'unix',
    password:'123456'
  }
  
  const logged = await api.post('/api/login')
    .send(login)
    .expect(200)
    .expect('Content-Type',/application\/json/)

  //construct authorization token 
  const token = `bearer ${logged.body.token}`
  await api.delete(`/api/blogs/${deleteFirstPost.id}`)
    .set('Authorization',token)
    .expect(204)

  //should be deduct 1
  const blogPostsEnd = await helper.blogInDb()
  expect(blogPostsEnd).toHaveLength(helper.blogs.length-1)

  //should not contains deleted title
  const deleteTitles = blogPostsEnd.map(t=>t.title)
  expect(deleteTitles).not.toContain(deleteFirstPost.title)

})

//4.14 update
test('updating the information of an individual blog post', async ()=>{
  const blogPosts = await helper.blogInDb()

  const updateFirstPost = blogPosts[0]
  // add 1 likes count
  const newLikes = updateFirstPost.likes + 1 

  updateFirstPost.likes = newLikes
  // request update
  const updatedPost = await api.put(`/api/blogs/${updateFirstPost.id}`)
    .send(updateFirstPost)
    .expect(200)
    .expect('Content-Type',/application\/json/)

  expect(updatedPost.body.likes).toEqual(newLikes)

})

////////////////////////////
//after the test complete
////////////////////////////
afterAll(()=>{
  mongoose.connection.close()
})

