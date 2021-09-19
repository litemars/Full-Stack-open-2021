import React from 'react'

const Persons =({persons, search_term}) =>{
    return(
        <>
        
        {persons.filter(person => person.name.toLowerCase().match(search_term.toLocaleLowerCase()))
        .map(person => <div id={person.id}>{person.name} {person.number}</div>
        ) }
    </>
    )
}
export default Persons