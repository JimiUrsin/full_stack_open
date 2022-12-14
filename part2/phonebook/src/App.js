import { useState, useEffect } from 'react'
import personService from './services/persons'
import './app.css'

const Filter = ({newFilter, setNewFilter}) => {
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}
  return (
    <p>filter shown with <input value={newFilter} onChange={handleFilterChange}/></p>
  )
}

const Notification = ({ message, notifClass }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={notifClass}>
      {message}
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        name: <input value={props.newName} onChange={props.handleNameChange}/>
      </div>
      <div>
        number: <input value={props.newNumber} onChange={props.handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Person = ({person, deletePerson}) => {
  return (
    <li key={person.name}>
      {person.name} {person.number} <button onClick={() => deletePerson(person.id, person.name)}>delete</button>
    </li>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [changed, setChanged] = useState(true)
  const [success, setSuccess] = useState(null)
  const [error, setError] = useState(null)

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}

  useEffect(() => {
    personService
      .getAll()
      .then((personData) =>
        setPersons(personData)
      )
  }, [changed])

  const addPerson = (event) => {
    event.preventDefault()


    const newPerson = {
      name: newName,
      number: newNumber
    }

    const foundPerson = persons.find((person) => person.name === newName)
    if (foundPerson !== undefined) {
      if (!window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        return
      }
      personService
        .update(foundPerson.id, newPerson)
        .then(() => 
          setChanged(!changed)
        )
    }
    else {
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setSuccess(
            `Added ${newPerson.name}`
          )
          setTimeout(() => 
            setSuccess(null)
          , 5000)
        })
    }
  }
  
  const deletePerson = (id, name) => {
    if (!window.confirm(`Delete ${name}?`)) {
      return
    }
    personService
      .deletePerson(id)
      .catch(() => {
        setError(`Information of ${name} has already been removed from server`)
        setTimeout(() => 
          setError(null)
        , 5000)
      })
      .finally(() => {
        setChanged(!changed)
      })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={success} notifClass="success"/>
      <Notification message={error} notifClass="error" />
      <Filter filter={newFilter} setNewFilter={setNewFilter}/>
      <h3>add a new</h3>
      <PersonForm 
        persons={persons} setPersons={setPersons}
        newName={newName} setNewName={setNewName}
        addPerson={addPerson}
        handleNameChange={handleNameChange} handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <ul>
          {persons === undefined
            ? <></>
            : persons
              .filter((person) => person.name.toUpperCase().includes(newFilter.toUpperCase()))
              .map((person) => <Person key={person.id} person={person} deletePerson={deletePerson}/>)
          }
      </ul>
    </div>
  )
}

export default App
