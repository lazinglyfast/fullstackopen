import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" },
    { name: "teddy" },
  ])

  const [newName, setNewName] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const entryAlreadyExists = persons.some((person) => person.name === newName)
    if (entryAlreadyExists) {
      alert(`${newName} already exists`)
    } else {
      setPersons(persons.concat({
        name: newName
      }))
    }
  }

  const onNameChange = (event) => {
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={onNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form >
      <h2>Numbers</h2>
      {persons.map((person) => <div key={person.name}>{person.name}</div>)}
    </div >
  )
}

export default App
