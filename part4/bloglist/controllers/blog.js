const blogRouter = require('express').Router()
//mongoDB model
const Blog = require('../models/blog')
const userExtractor = require('../utils/middleware').userExtractor


blogRouter.get('/',async (request,response)=>{

  //join other table and selected fields
  const blogs = await Blog.find({}).populate('user',{username:1,name:1,id:1})
  response.json(blogs)

})

blogRouter.post('/', userExtractor, async (request,response)=>{
  const body = request.body
  const user = request.user
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
blogRouter.delete('/:id', userExtractor, async (request,response)=>{
    const user = request.user
    const blog = await Blog.findById(request.params.id)
  //check user whether the blog owner
  if(blog.user.toString() === user.id.toString()){
    //owner allow delete
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }else{
    response.status(401).json({error:'blog can be deleted only by the user who added the blog'})
  }
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
