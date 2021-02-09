
import React, { useState } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => {
          getBooks()
          setPage('books')
          }
          }>
          books
        </button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'}
        authors={result.data.allAuthors} 
      />

      <Books
        show={page === 'books'}
        result={booksResult} 
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App