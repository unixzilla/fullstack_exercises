const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blog')
const app = require('../app')
//test app API 
const api = supertest(app)
//helper for demo data
const helper = require('./test_helper')

////////////////////////////
//before the test prepare 
////////////////////////////
beforeEach(async ()=>{
  //reset all 
  await Blog.deleteMany({})

  //insert all test data to DB
  for(let blog of helper.blogs){
    const newPost = new Blog(blog)
    await newPost.save()
  }

},10000)
//set(10000) longer time out

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
    title: "test react patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7
  }
  await api.post('/api/blogs')
  .send(newPost)
  .expect(201)
  .expect('Content-Type',/application\/json/)
  
  const postAtEnd = await helper.blogInDb()
  expect(postAtEnd).toHaveLength(helper.blogs.length+1)
  const titles = postAtEnd.map(p=>p.title) 
  expect(titles).toContain('test react patterns')


})
//4.11 try create post that missing property filled default value
test('if the likes property is missing from the request',async () =>{
  const newPost = {
    title: "test react patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
  }
  const blogPost = await api.post('/api/blogs')
  .send(newPost)
  .expect(201)
  .expect('Content-Type',/application\/json/)

  expect(blogPost.body.likes).toEqual(0)

})

//4.12 try create post that missing required properties
test('if the title and url properties are missing from the request data',async ()=>{
  const newPost = {
    author: "Michael Chan"
  }
  await api.post('/api/blogs')
  .send(newPost)
  .expect(400)
})

//4.13 delete
test('deleting a single blog post resource',async ()=>{
  const blogPosts = await helper.blogInDb()
  const deleteFirstPost = blogPosts[0]
  await api.delete(`/api/blogs/${deleteFirstPost.id}`)
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

