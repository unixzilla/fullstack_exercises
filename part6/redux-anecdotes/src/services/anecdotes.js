import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    content,
    votes:0
  }
  const response = await axios.post(baseUrl,object)
  return response.data
}

const vote = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)

  await axios.patch(`${baseUrl}/${id}`,
    {
      votes: response.data.votes + 1
    })
}

export default { getAll,createNew, vote }
