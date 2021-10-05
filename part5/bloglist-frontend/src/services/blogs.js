import axios from 'axios'

let token = null
const baseUrl = '/api/blogs'

const setToken = newToken=>{
  token = `bearer ${newToken}`
}

const addBlog = async (blog) => {
  const config = {
    headers:{ Authorization: token},
  }
  console.log(blog)
  const response = await axios.post(baseUrl,blog,config)
  return response.data
}

const updateBlog = async (blog) => {
  const config = {
    headers:{ Authorization: token},
  }
  console.log(blog)
  const response = await axios.put(`${baseUrl}/${blog.id}`,blog,config)
  return response.data
}

const deleteBlog = async (blog) => {
  const config = {
    headers:{ Authorization: token},
  }
  const response = await axios.delete(`${baseUrl}/${blog.id}`,config)
  return response.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll,addBlog,setToken,updateBlog,deleteBlog}
