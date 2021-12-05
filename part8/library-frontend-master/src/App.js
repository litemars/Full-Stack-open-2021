
import React, { useState, useEffect } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
import Login from './components/Login'
import { useQuery, useSubscription } from '@apollo/client'
import { BOOKS, AUTHORS, BOOK_ADDED } from './queries/query'

const App = () => {
  const authors =useQuery(AUTHORS)
  const books =useQuery(BOOKS);
  const [page, setPage] = useState('login')
  const [token, setToken] = useState(null)

  useEffect(() => {
    if (!token) setToken(localStorage.getItem('token'))
  }, [token])


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      //console.log(subscriptionData)
      window.alert(`New book "${subscriptionData.data.bookAdded.title}" added!`)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage('authors')
  }
  if(authors.loading){
    return<div>loading....</div>
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        
        {token ? (
          <>
          <button onClick={() => setPage('add')}>add book</button>
          <button onClick={() => setPage('recommended')}>recommended</button>
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
      <Recommended
        show={page === 'recommended'}
        books={books}
      />

    <Login 
        setToken={setToken}
        show={page === 'login'}
      />

    </div>
  )
}

export default App