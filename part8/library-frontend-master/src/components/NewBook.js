import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ADD_BOOK, BOOKS, AUTHORS } from '../queries/query'

const NewBook = (props) => {

  const [ addBook ] = useMutation(ADD_BOOK,{
    onError:(error)=>{console.log("error new books")},
    refetchQueries: [{ query: BOOKS }, { query: AUTHORS }]
    })

  const [title, setTitle] = useState('')
  const [author, setAuhtor] = useState('')
  const [published_string, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if (!props.show) {
    return null
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  const submit = async (event) => {
    event.preventDefault()
    addGenre()
    let published=parseInt(published_string, 10)
    console.log("all value",title,author,published,genres)
    addBook({
      variables: {title,author,published,genre:genres}
    })
    setTitle('')
    setPublished('')
    setAuhtor('')
    setGenres([])
    setGenre('')
  }



  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuhtor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type='number'
            value={published_string}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">add genre</button>
        </div>
        <div>
          genres: {genres.join(' ')}
        </div>
        <button type='submit'>create book</button>
      </form>
    </div>
  )
}

export default NewBook