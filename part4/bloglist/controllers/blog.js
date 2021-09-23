const blogRouter = require('express').Router()
//mongoDB model
const Blog = require('../models/blog')

blogRouter.get('/',async (request,response)=>{

	const blogs = await Blog.find({})
  response.json(blogs)

})

blogRouter.post('/',async (request,response)=>{

	const blog = new Blog({
    title:request.body.title,
    author:request.body.author,
    url:request.body.url,
    likes:(request.body.likes)?request.body.likes:0
  })

	const result = await blog.save()
  response.status(201).json(result)

})

//delete post
blogRouter.delete('/:id',async (request,response)=>{
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})
//update post
blogRouter.put('/:id',async (request, response)=>{
  const body = request.body
  const post = {
    title:body.title,
    author:body.author,
    url:body.url,
    likes:(body.likes)?body.likes:0
  }
  const updatedPost = await Blog.findByIdAndUpdate(request.params.id,post,{new:true})
  response.json(updatedPost.toJSON())

})

module.exports = blogRouter
