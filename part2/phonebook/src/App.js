import React, { useState , useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search_term, searchTerm ] = useState('')
  
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons').then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }, [])

  const addPerson  = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    if(persons.filter(per=>per.name===personObject.name).length!==0){
      alert(newName +' is already added to phonebook')
    }else{

    setPersons(persons.concat(personObject))
    setNewName('')
    setNumber('')
    }
  }
  const hadleNewPerson = (event) =>{
    setNewName(event.target.value)
  }
  const hadleNewNumber = (event) =>{
    setNumber(event.target.value)
  }
  const hadleSearch = (event) =>{
    searchTerm(event.target.value)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter search_term={search_term} hadleSearch={hadleSearch}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} addPerson={addPerson} newNumber={newNumber} hadleNewPerson={hadleNewPerson} hadleNewNumber={hadleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search_term={search_term}/>
    </div>

  )
}

export default App