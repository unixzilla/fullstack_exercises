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

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll,addBlog,setToken}
