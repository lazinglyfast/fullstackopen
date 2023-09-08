import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [query, setQuery] = useState(new RegExp())

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
      <div>
        filter shown with: <input onChange={onFilterChange} />
      </div>
      <form onSubmit={addPerson}>
        <h2>Add new</h2>
        <div>
          name: <input onChange={onNameChange} />
        </div>
        <div>
          number: <input onChange={onNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form >
      <h2>Numbers</h2>
      {
        persons
          .filter((person) => {
            return query.test(person.name)
          })
          .map((person) => {
            return <div key={person.id}>{person.name} {person.number}</div>
          })}
    </div >
  )
}

export default App
