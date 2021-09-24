import React, { useState , useEffect } from 'react'
import PersonForm from './Components/PersonForm'
import Filter from './Components/Filter'
import Persons from './Components/Persons'
import Notification from './Components/Notification'
import {getAll,delede, create,update} from './Components/Services';


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNumber ] = useState('')
  const [ search_term, searchTerm ] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    getAll()
      .then(response => {
        console.log(response)
        setPersons(response)
      })
  }, [])


  const deledeFunction = (event)=>{
    var id = event.target.id
    var n=event.target.value
    if(window.confirm("Delete "+n+" ?"))
    {
    delede(id)
    .then(()=>{
    const newPersons = persons.filter(per => {
      return per.id.toString() !== id;
    })
    setPersons(newPersons)
  })
  .catch(error =>{
    setError(
      "Information of "+n+" has already been removed from server"  
    )
    setTimeout(() => {
      setError(null)
    }, 5000)
  })
  }

}

  const addPerson  = (event) => {
    event.preventDefault()
    let error_name=newName
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }
    if(persons.filter(per=>per.name===personObject.name).length!==0){
      if(window.confirm(personObject.name + " is already added to phonebook, replace the old number with a new one?")){
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
      console.log(personObject)
      create(personObject)
      .then(() => {
        setPersons(persons.concat(personObject))
        setNewName('')
        setNumber('')
        setError(
          "Added "+error_name 
        )
        setTimeout(() => {
          setError(null)
        }, 5000)
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
      {error?<Notification  message={error}/>:<></>}
      <Filter search_term={search_term} hadleSearch={hadleSearch}/>
      <h2>Add a new</h2>
      <PersonForm newName={newName} addPerson={addPerson} newNumber={newNumber}  hadleNewPerson={hadleNewPerson} hadleNewNumber={hadleNewNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} search_term={search_term} deledeFunction={deledeFunction}/>
    </div>

  )
}

export default App