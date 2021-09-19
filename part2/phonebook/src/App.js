import React, { useState } from 'react'
import Form from './Components/Form'
import Filter from './Components/Filter'
import Persons from './Components/Persons'


const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search_term, searchTerm ] = useState('')
  
  const addPerson  = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    if(persons.filter(per=>per.name===personObject.name).length!==0){
      alert(newName +'is already added to phonebook')
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
      <Filter search_term={search_term} hadleSearch={hadleSearch}></Filter>
      <Form newName={newName} addPerson={addPerson} newNumber={newNumber} hadleNewPerson={hadleNewPerson} hadleNewNumber={hadleNewNumber}></Form>
      <Persons persons={persons} search_term={search_term}></Persons>
    </div>

  )
}

export default App