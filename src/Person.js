import React from 'react'

const Person = ({ name, number, deletePerson }) => {
    return (
        <li>
            {name} {number} <button onClick={deletePerson} >delete</button>
        </li>
    )
}

export default Person
