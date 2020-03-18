import React, { useState, useEffect } from 'react'
import Filter from './Filter'
import Persons from './Persons'
import PersonForm from './PersonForm'
import personService from './services/persons'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [filterName, setFilterName] = useState('')
    const [notification, setNotification] = useState(null)

    useEffect(() => {
        personService
            .getAll()
            .then(initialData => {
                setPersons(initialData)
            })
    }, [])

    const personsFilter = persons.filter(p => p.name.includes(filterName))

    const addPerson = (e) => {
        e.preventDefault()
        const person = { name: newName, number: newNumber }
        const existPerson = persons.find(p => p.name === newName)
        if (existPerson) {
            const question = window.confirm(`${existPerson.name} is alredy to phonebook, replace the od number whith a new one?`)

            const id = existPerson.id
            if(question){
                personService
                    .update(id, person)
                    .then(returnedPerson => {
                        setPersons(persons.map(p => p.id !== id ? p :returnedPerson))
                        setNotification(`${returnedPerson.name} change number`)

                        setTimeout(() => {
                            setNotification(null)
                        }, 5000);
                    })
                    .catch(err => {
                        setTimeout(() => {
                            setNotification(null)
                        }, 3000);
                        setNotification(`Information ${existPerson.name} has already been removed from server`)
                    })
            }
        } else {
            personService
                .create(person)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNotification(`Added ${returnedPerson.name}`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 5000);
                })
                .catch(err => {
                    setNotification(`${person.name} not added`)
                    setTimeout(() => {
                        setNotification(null)
                    }, 3000);
                })
        }
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

    const deletePerson = (id) => {
        const person = persons.find(p => p.id === id)
        const question = window.confirm(`Delete ${person.name}`)

        if(question){
            personService
                .removed(id)
                .then(res => {
                    setPersons(persons.filter(p => p.id !== id))
                })
                .catch(err => {
                    setTimeout(() => {
                        setNotification(null)
                    }, 3000);
                    setNotification(`${person.name} delete from server`)
                })
        } else {
            return
        }
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <Notification message={notification} />
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
            <Persons persons={personsFilter} deletePerson={deletePerson} />
        </div>
    )
}

export default App