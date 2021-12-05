import React, {useState} from 'react'
import Genres from './Genres'

const Books = (props) => {

  const result = props.books

  const [genre,setGenres_fun]=useState(null)
  
  if (!props.show) {
    return null
  }
  if (result.loading) return <div>loading...</div> 

const genres = result.data.allBooks.flatMap(b => b.genre)
const books = genre ? result.data.allBooks.filter(b => b.genre.includes(genre)) : result.data.allBooks


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
      <Genres genres={genres} setGenres_fun={setGenres_fun}/>
    </div>
    
  )
}

export default Books