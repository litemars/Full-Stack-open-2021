import React from 'react'
import { useQuery } from '@apollo/client'
import { ME } from '../queries/query'

const Recommended = (props) => {

 const result = props.books
 
 const user =useQuery(ME)   
 if (!props.show) {
    return null
  }
  if (result.loading) return <div>loading...</div> 
 const books = result.data.allBooks.filter(b => b.genre.includes(user.data.me.favoriteGenre))
  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended