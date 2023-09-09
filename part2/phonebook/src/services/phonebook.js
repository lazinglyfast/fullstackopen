import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const list = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = person => {
  return axios
    .post(baseUrl, person)
    .then(response => response.data)
}

const remove = person => {
  return axios.delete(`${baseUrl}/${person.id}`)
}

export default { list, create, delete: remove }
