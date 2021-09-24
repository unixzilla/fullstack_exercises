const blogRouter = require('express').Router()
//mongoDB model
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/',async (request,response)=>{

    //join other table and selected fields
	const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
  response.json(blogs)

})

blogRouter.post('/',async (request,response)=>{
    const body = request.body

    const user = await User.findById(body.userId)

	const blog = new Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:(body.likes)?body.likes:0,
        user:user._id
  })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
  response.status(201).json(savedBlog)

})

//delete post
blogRouter.delete('/:id',async (request,response)=>{
    const body = request.body.userId
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
