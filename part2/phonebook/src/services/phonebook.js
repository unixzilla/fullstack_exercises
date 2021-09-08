import axios from 'axios'
const apiURL = '/api/persons'
const getAll = () => {
    const request = axios
      .get(apiURL)
      .then(response => {
        if (response.status === 200) {
          return response.data
        }
      })
      return request
}

const addPerson = (person) => {
    const request = axios
      .post(apiURL,person)
      .then(response => response.data)
    return request
}
const removePerson = (id) => {
    const request = axios
      .delete(`${apiURL}/${id}`)
      .then(response => response.data)
    return request
}
const updatePerson = (person,id) => {
  const request = axios
  .put(`${apiURL}/${id}`,person)
  .then(response => response.data)
  return request
}
export default {getAll,addPerson,removePerson,updatePerson}