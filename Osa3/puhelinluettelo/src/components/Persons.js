import React from 'react'

const Person = ({ person, deletePerson }) => {
  return (
    <li>{person.name} {person.number} <button onClick={deletePerson}>delete</button> </li>
  )
}

const Persons = (props) => {
  return (
    <ul>
      {
        props.persons
          .filter(person => person.name.toLowerCase().includes(props.filterString.toLowerCase()))
          .map(person => <Person key={person.name} person={person} deletePerson={() => props.deletePerson(person.id)} />)
      }
    </ul>
  )
}

export default Persons