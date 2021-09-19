import React from 'react'

const Filter =({search_term,hadleSearch}) =>{
    return(
    <>
        <h2>Phonebook</h2>
        <div> filter shown with <input value={search_term} onChange={hadleSearch}/></div>
    </>
    )
}
export default Filter