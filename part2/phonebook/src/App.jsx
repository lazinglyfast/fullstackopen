import { useState, useEffect } from "react"
import Search from "./components/Search"
import Form from "./components/Form"
import Phonebook from "./components/Phonebook"
import Notification from "./components/Notification"
import phonebookService from "./services/phonebook"

const TIMEOUT = 5000

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState(new RegExp())
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebookService
      .list()
      .then(serverPerson => {
        setPersons(serverPerson)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const persistedPerson = persons.find(person => person.name === newName)
    const msg = `${newName} is already added to the phonebook, replace the old number with a new one?`
    if (persistedPerson && window.confirm(msg)) {
      const personObject = { ...persistedPerson, number: newNumber }
      phonebookService
        .update(personObject)
        .then(serverPerson => {
          setPersons(persons.map(p => {
            return p.id == serverPerson.id ? personObject : p
          }))
          setNotification(`Changed ${serverPerson.name}'s phone number to ${serverPerson.number}`)
          setTimeout(() => setNotification(null), TIMEOUT)
        })
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      phonebookService
        .create(personObject)
        .then(serverPerson => {
          setPersons(persons.concat(serverPerson))
          setNotification(`Added ${serverPerson.name}`)
          setTimeout(() => setNotification(null), TIMEOUT)
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
          setNotification(`Deleted ${person.name}`)
          setTimeout(() => setNotification(null), TIMEOUT)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Search onFilterChange={onFilterChange} />
      <Form addPerson={addPerson} onNameChange={onNameChange} onNumberChange={onNumberChange} />
      <Phonebook query={query} persons={persons} handleDeleteOf={handleDeleteOf} />
    </div >
  )
}

export default App
