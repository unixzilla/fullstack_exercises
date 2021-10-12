import React from 'react'
import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog,user,update,remove }) => {
  const blogStyle={
    paddingTop:10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  //show remove button if blog post is created by user
  const removable = blog.user.username === user.username
  const showRemove = {
    display: removable ?'':'none'
  }
  const clickLike = () => {
    update({
      ...blog,
      likes:blog.likes+1
    })
  }
  const removeBlog = () => {
    if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
      remove(blog)
    }
  }
  return(
    <div className='blog-item' style={blogStyle}>
      <div className='blog-title'>{blog.title} {blog.author}</div>
      <Togglable buttonLabel='view'>
        <div>
          {blog.url}
        </div>
        <div>
    likes {blog.likes}<button className='like-button' onClick={clickLike}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <button id='remove_blog' style={showRemove} onClick={removeBlog}>remove</button>
      </Togglable>
    </div>
  )
}
//Types checking for React props
Blog.propTypes = {
  update:PropTypes.func.isRequired,
  remove:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  blog:PropTypes.object.isRequired
}

export default Blog
