import { useState, useEffect } from "react"
import axios from "axios"
import Search from "./components/Search"
import Form from "./components/Form"
import Phonebook from "./components/Phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState(new RegExp())

  useEffect(() => {
    axios
      .get("http://localhost:3001/persons")
      .then((response) => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const entryAlreadyExists = persons.some((person) => person.name === newName)
    if (entryAlreadyExists) {
      alert(`${newName} already exists`)
    } else {
      const largestId = persons.reduce((max, person) => {
        person.id > max ? person.id : max
      }, Number.MIN_VALUE)
      setPersons(persons.concat({
        id: largestId + 1,
        name: newName,
        number: newNumber
      }))
    }
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  const onNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const onFilterChange = (event) => {
    // performance hit
    setQuery(new RegExp(event.target.value, "i"))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search onFilterChange={onFilterChange} />
      <Form addPerson={addPerson} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <Phonebook query={query} persons={persons} />
    </div >
  )
}

export default App
