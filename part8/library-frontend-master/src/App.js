
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import { useQuery } from '@apollo/client'
import { BOOKS, AUTHORS } from './queries/query'

const App = () => {
  const authors =useQuery(AUTHORS)
  const books =useQuery(BOOKS);
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (!token) setToken(localStorage.getItem('token'))
  }, [token])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {token ? (
          <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => logout()}>logout</button>
          </>
          ):
          <button onClick={() => setPage('login')}>login</button>
          }
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

    <Login 
        setToken={setToken}
        show={page === 'login'}
      />

    </div>
  )
}

export default App