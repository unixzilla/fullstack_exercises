import React,{useState} from 'react'

const CreateNewBlog = ({createBlog})=>{
    const [title,setTitle] = useState("")
    const [author,setAuthor] = useState("")
    const [url,setUrl] = useState("")

    const handleCreate = (event)=>{
        event.preventDefault()
            createBlog(
                {title:title,
                author:author,
                url:url}
            )
            setTitle("")
            setAuthor("")
            setUrl("")
    }

    return (
    <div>
      <h1>create new</h1>
      <form onSubmit={handleCreate}>
      <div>
      title:<input 
        type="text"
        value={title}
        name="title"
        onChange={({target})=>setTitle(target.value)}
      /> 
      </div>
      <div>
        author:<input 
          type="text"
          value={author}
          name="author"
          onChange={({target})=>setAuthor(target.value)}
      /> 
      </div>
      <div>
        url:<input 
          type="text"
          value={url}
          name="url"
          onChange={({target})=>setUrl(target.value)}
      /> 
      </div>
      <div>
        <button type="submit">create</button>
      </div>
      </form>
    </div>

    )
}

export default CreateNewBlog
