import React from 'react'

const Form =({newName,newNumber,hadleNewPerson,hadleNewNumber,addPerson}) =>{
    return(
    <>
    <h2>Add a new</h2>
    <form onSubmit={addPerson}>
    <div> name: <input value={newName} onChange={hadleNewPerson}/></div>
    <div>number: <input value={newNumber} onChange={hadleNewNumber}/></div>
    <button type="submit">add</button>
    </form>
    </>
    )
}
export default Form