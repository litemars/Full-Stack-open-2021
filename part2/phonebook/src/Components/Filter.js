import React from 'react'

const Filter =({search_term,hadleSearch}) =>{
    return(
    <>
        <div> filter shown with <input value={search_term} onChange={hadleSearch}/></div>
    </>
    )
}
export default Filter