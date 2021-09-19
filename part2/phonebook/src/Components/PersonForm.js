import React from 'react'

const PersonForm =({newName,newNumber,hadleNewPerson,hadleNewNumber,addPerson}) =>{
    return(
    <>
    <form onSubmit={addPerson}>
    <div> name: <input value={newName} onChange={hadleNewPerson}/></div>
    <div>number: <input value={newNumber} onChange={hadleNewNumber}/></div>
    <button type="submit">add</button>
    </form>
    </>
    )
}
export default PersonForm