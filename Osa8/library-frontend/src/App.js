
import React, { useState } from 'react'
import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import { ALL_AUTHORS, ALL_BOOKS, FAVORITE_GENRE } from './queries'

const Notify = ({ errorMessage }) => {
  if ( !errorMessage ) {
    return null
  }

  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [getFavorites, favoritesResult] = useLazyQuery(FAVORITE_GENRE)
  const result = useQuery(ALL_AUTHORS)
  const client = useApolloClient()

  if (result.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const handleLogout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    if (!(page === 'authors' || page === 'books')) {
      // Get out of pages requiring login
      setPage('authors')
    }
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => {
          getBooks()
          setPage('books')
          }
          }>
          books
        </button>
        {(() => {
          if (token) {
            return (
              <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => {
                  getFavorites()
                  setPage('recommend')}}>
                    recommend
                </button>
                <button onClick={handleLogout}>logout</button>
              </>
            )
          } else {
            return (
              <button onClick={() => setPage('login')}>login</button>
            )
          }
        })()}
      </div>

      <Authors
        show={page === 'authors'}
        logged={!!token}
        authors={result.data.allAuthors} 
      />

      <Books
        show={page === 'books'}
        result={booksResult} 
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommend'}
        result={favoritesResult}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        notify={notify}
      />
    </div>
  )
}

export default App