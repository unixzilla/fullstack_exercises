import React from 'react'
import Togglable from './Togglable'

const Blog = ({blog,user}) => {
    const blogStyle={
        paddingTop:10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }
    //show remove button if blog post is created by user
    const showRemove = {
        display: (blog.user._id === user.id)?'':'none'
    }
    const clickLike = ()=>{
        console.log('like+')
    }
    const removeBlog = ()=>{
        window.confirm('Remove blog {title} by {author}')
    }
    return
    (
        <div style={blogStyle}>
            <div>{blog.title} {blog.author}</div>
            <Togglable buttonLabel='view'>
                <div>
                    {blog.url}
                </div>
                <div>
                    likes {blog.likes}<button onClick={clickLike}>like</button>
                </div>
                <div>
                    {blog.user.name}
                </div>
                <button style={showRemove} onClick={removeBlog}>remove</button>
            </Togglable>
        </div>
    )
}
export default Blog