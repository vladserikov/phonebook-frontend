import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')

    useEffect(() => {
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                setPersons(response.data)
            })
    }, [])

    const personsFilter = persons.filter(p => p.name.includes(filterName))

    const addPerson = (e) => {
        e.preventDefault()
        if (persons.find(p => p.name === newName)) {
            window.alert(`${newName} is already added to phonebook`)
            return
        }
        const person = {name: newName, number: newNumber}
        setPersons(persons.concat(person))
        setNewName('')
        setNewNumber('')
    }

    const handleNewName = ({target}) => {
        setNewName(target.value)
    }

    const handleNewNumber = ({target}) => {
        setNewNumber(target.value)
    }

    const handleFilter = ({target}) => {
        setFilterName(target.value)
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <Filter value={filterName} onChange={handleFilter} />
            <h2>add a new</h2>
            <PersonForm 
                addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />
            <h2>Numbers</h2>
            <Persons persons={personsFilter} />
        </div>
    )
}

export default App