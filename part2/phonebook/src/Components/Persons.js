import React from 'react'
const Persons =({persons, search_term, deledeFunction}) =>{



    return(
        <>
        {persons.filter(person => person.name.toLowerCase().match(search_term.toLocaleLowerCase()))
        .map(person =>  <div key={person.id}>{person.name} {person.number} <button id={person.id} value={person.name} onClick={deledeFunction}>delede</button></div>
        ) }
    </>
    )
}
export default Persons