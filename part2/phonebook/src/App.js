import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { 
      name: 'Arto Hellas',
      number: '112'
    }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const newPerson = [{
      name: newName,
      number: newNumber
    }]
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={(event) => {setNewName(event.target.value)}}
                />
        </div>
        <div>
          number: <input
                    value={newNumber}
                    onChange={(event) => {setNewNumber(event.target.value)}}
                  />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
          {persons.map((person) => 
            <li key={person.name}>{person.name} {person.number}</li>
          )}
      </ul>
    </div>
  )
}

export default App
