import React, { useEffect, useState } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import ErrorMessage from './components/ErrorMessage'

const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterString, setFilterString ] = useState('')
  const [ message, setMessage ] = useState(null)
  const [ errorMessage, setErrorMessage ] = useState(null)
 
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
    }
    let person = undefined
    // eslint-disable-next-line no-cond-assign
    if ((person = persons.find(element => element.name === newName)) !== undefined) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)) {
        personService
          .update(person.id, personObject)
          .then((returnedPerson) => {
            setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
            setMessage(`Changed ${newName}'s phone number to ${newNumber}`)
            setTimeout(() => {setMessage(null)}, 5000)
            setNewName('')
            setNewNumber('')  
          })
          .catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
            setTimeout(() => {setErrorMessage(null)}, 5000)
            setPersons(persons.filter(p => p.id !== person.id))
          })
      }
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
          setMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
      
    }
  }

  const deletePerson = (id) => {
    const name = persons.find(p => p.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          setMessage(`Deleted ${name}`)
          setTimeout(() => {setMessage(null)}, 5000)
        })
    }
  }

  const handlePersonChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <ErrorMessage message={errorMessage} />
      <Filter filterString={filterString} handleFilterChange={handleFilterChange} />
      <h3>add a new</h3>
      <PersonForm addPerson={addPerson} newName={newName} handlePersonChange={handlePersonChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Persons persons={persons} filterString={filterString} deletePerson={deletePerson} />
    </div>
  )

}

export default App