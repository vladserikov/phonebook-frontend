import React from 'react'
import Person from './Person'

const Persons = ({ persons, deletePerson }) => {
    return (
        <ul>
            {
                persons.map(person => 
                    <Person key={person.name} name={person.name} number={person.number} deletePerson={() => deletePerson(person.id)} />
                )
            }
        </ul>
    )
}

export default Persons
