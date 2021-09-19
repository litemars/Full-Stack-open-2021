import React from 'react'

const Persons =({persons, search_term}) =>{
    return(
        <>
        <h2>Numbers</h2>
        {persons.filter(person => person.name.toLowerCase().match(search_term.toLocaleLowerCase()))
        .map(person => <div id={person.id}>{person.name} {person.number}</div>
        ) }
    </>
    )
}
export default Persons