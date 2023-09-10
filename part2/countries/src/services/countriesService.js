import axios from "axios"

const list = () => {
  return axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then(response => response.data)
}

const get = countryName => {
  return axios
    .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`)
    .then(response => response.data)
}

export default { list, get }
