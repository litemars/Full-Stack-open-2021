import React, { useState , useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import {getAll,delede, create,update} from './Components/Services';


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search_term, searchTerm ] = useState('')
  
  useEffect(() => {
    getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }, [])


  const deledeFunction = (event)=>{
    var id = event.target.id
    if(window.confirm("Delete "+event.target.value+" ?"))
    {
    delede(id)
    .then(()=>{
    const newPersons = persons.filter(per => {
      return per.id.toString() !== id;
    })
    setPersons(newPersons)
  })
  .catch(error =>{
    console.log("fail")
  })
  }

}

  const addPerson  = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    if(persons.filter(per=>per.name===personObject.name).length!==0){
      if(window.confirm(personObject.name + "is already added to phonebook, replace the old number with a new one?")){
        const old = persons.filter(per => {
          return per.name === personObject.name;
        })
        const newPersons = persons.filter(per => {
          return per.name !== personObject.name;
        ;})
        update(old[0].id,personObject)
        .then(() => {
          personObject.id=old[0].id
          setPersons(newPersons.concat(personObject))
          setNewName('')
          setNumber('')
        })
        .catch(()=>
          console.log("error"))
      }
    }else{
      create(personObject)
      .then(() => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNumber('')
      })
      .catch(()=>
      console.log("error"))
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
      <PersonForm newName={newName} addPerson={addPerson} newNumber={newNumber}  hadleNewPerson={hadleNewPerson} hadleNewNumber={hadleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search_term={search_term} deledeFunction={deledeFunction}/>
    </div>

  )
}

export default App