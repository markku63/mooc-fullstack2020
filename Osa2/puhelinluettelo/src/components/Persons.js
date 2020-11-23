import React from 'react'

const Person = ({ person }) => {
    return (
    <li>{person.name} {person.number}</li>
    )
}

const Persons = (props) => {
    return (
        <ul>
            {props.persons.filter(person => person.name.toLowerCase().includes(props.filterString.toLowerCase())).map(person => <Person key={person.name} person={person} />)}
        </ul>
    )
}

export default Persons