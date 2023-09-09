import { useState, useEffect } from "react"
import Search from "./components/Search"
import Form from "./components/Form"
import Phonebook from "./components/Phonebook"
import phonebookService from "./services/phonebook"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState(new RegExp())

  useEffect(() => {
    phonebookService
      .list()
      .then(data => {
        setPersons(data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const entryAlreadyExists = persons.some((person) => person.name === newName)
    if (entryAlreadyExists) {
      alert(`${newName} already exists`)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .create(personObject)
        .then(data => {
          setPersons(persons.concat(data))
        })
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

  const handleDeleteOf = person => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .delete(person)
        .then(() => {
          setPersons(persons.filter(p => p.id != person.id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Search onFilterChange={onFilterChange} />
      <Form addPerson={addPerson} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <Phonebook query={query} persons={persons} handleDeleteOf={handleDeleteOf} />
    </div >
  )
}

export default App
