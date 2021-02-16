
import React, { useState } from 'react'
import { useQuery, useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'
import Notify from './components/Notify'
import { FAVORITE_GENRE, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const favoritesResult = useQuery(FAVORITE_GENRE)
  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log('Book added:', addedBook)
      window.alert(`Added book ${addedBook.title} by ${addedBook.author.name}`)
    }
  })

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
    favoritesResult.refetch()
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
        favoritesResult={favoritesResult}
        show={page === 'recommend'}
      />

      <Login
        show={page === 'login'}
        setToken={setToken}
        notify={notify}
        favoritesResult={favoritesResult}
      />
    </div>
  )
}

export default App