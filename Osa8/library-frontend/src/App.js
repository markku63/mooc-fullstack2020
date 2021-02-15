
import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import Notify from './components/Notify'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

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
        <button onClick={() => setPage('books')}>books</button>
        {(() => {
          if (token) {
            return (
              <>
                <button onClick={() => setPage('add')}>add book</button>
                <button onClick={() => setPage('recommend')}>recommend</button>
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
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendations
        show={page === 'recommend'}
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