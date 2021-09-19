import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')
  
  const hadleNewChange  = () => {
    //console.log(target.value)
    setNewName(newName)
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={hadleNewChange}>
        <div>
          name: <input value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      ...
      <div>debug: {newName}</div>
    </div>

  )
}

export default App