  
import React, { useState } from 'react'
import {useMutation } from '@apollo/client'
import { AUTHORS, EDIT_AUTHOR, BOOKS } from '../queries/query'
import Select from "react-select";

const Authors = (props) => {

  
  const [name, setName] = useState(null)
  const [born_string, setBorn] = useState('')

  const [ editAuthor ] = useMutation(EDIT_AUTHOR,{
    refetchQueries: [{ query: BOOKS }, { query: AUTHORS }]
    })

    const result = props.authors
    if (!props.show) {
      return null
    }
  
    
    if(result.loading){
      return<div>loading....</div>
    }

  const submit = async (event) => {

    event.preventDefault()
    
    let setBornTo=parseInt(born_string, 10)
    editAuthor({
      variables: { name, setBornTo },
    })
    setBorn('')
    setName(null)
  }
  

  


  const authors = result.data.allAuthors

  return (
    
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthday</h2>
      <form onSubmit={submit}>
      <Select defaultValue="" onChange={({value})=>setName(value)}
        options={result.data.allAuthors.map((a)=>({
          value: a.name,
          label: a.name
        }))} />
        <div>
          Born:
          <input
            value={born_string}
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type="submit">Update Author</button>
      </form>

    </div>
  )
}

export default Authors
