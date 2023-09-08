import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas" }
  ])

  const [newName, setNewName] = useState("")

  const addPerson = (event) => {
    console.log("here")
    event.preventDefault()
    setPersons(persons.concat({
      name: newName
    }))
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
