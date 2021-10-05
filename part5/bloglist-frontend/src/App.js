import React, { useState, useEffect,useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [user,setUser] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ notificationStyle, setNotificationStyle ] = useState('error green')

  //get data from mongoDB
  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  //retrieve a JSON string to get user Object from local storage
  useEffect(()=> {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if(loggedUserJSON){
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  //component event ref
  const blogFormRef = useRef()

  //handle logout
  const logout = (event)=>{
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
  }

    //form submit new blog
    //make sure add header token
    const handleCreate = async (blogObject)=>{
        try{
            blogFormRef.current.toggleVisibility()
            blogService.setToken(user.token)
            const newBlog = await blogService.addBlog(blogObject)
            console.log("response:",newBlog)
            //call component event

            setNotificationStyle('error green')
            setErrorMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`)
            setBlogs(blogs.concat(newBlog))
            setTimeout(()=>{
                setErrorMessage(null)
            },5000)
        }catch(exception){
            setNotificationStyle('error red')
            console.log(exception)
            setErrorMessage('Wrong input')
            setTimeout(()=>{
                setErrorMessage(null)
            },5000)
        }
    }
  //form submit handle 
  const handleLogin = async (event)=>{
    event.preventDefault()
    console.log('logining in with',username,password)
    try{
      const user = await loginService.login({
        username,password
      })
      //save user Object into local storage as String
      window.localStorage.setItem(
        'loggedNoteappUser',JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    }catch(exception){
      setNotificationStyle('error red')
      setErrorMessage('Wrong username or password')
      setTimeout(()=>{
        setErrorMessage(null)
      },5000)

    }

  }
  if(user === null){ 
    return (
      <div>
      <h2>log in to application</h2>
      <Notification message={errorMessage} className={notificationStyle}/>
      <form onSubmit={handleLogin} >
      <div>
      username<input 
      type="text" 
      value={username}
      name="username"
      onChange={({target})=>setUsername(target.value)}
      />
      </div>
      <div>
      password<input 
      type="password" 
      value={password}
      name="password"
      onChange={({target})=>setPassword(target.value)}
      />
      </div>
      <button type="submit">login</button>
      </form>
      </div>
    )
  }

  return (
    <div>
    <h2>blogs</h2>
    <Notification message={errorMessage} className={notificationStyle}/>
    {user.username} logged in <button onClick={logout}>logout</button>

    <Togglable buttonLabel='create' ref={blogFormRef}>
        <CreateNewBlog handleCreate={handleCreate}/>
    </Togglable>

    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} user={user}/>
    )}
    </div>

  )
}

export default App
