import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  const [genre, setGenre] = useState(null)
  const allGenres = useQuery(ALL_GENRES)
  const [getResult, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    getResult({ variables: { genre: genre }})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre])

  if (!props.show) {
    return null
  }

  if (!(result.data && allGenres.data)) {
    return (
      <div>loading...</div>
    )
  }

  const books = result.data.allBooks
  const genres = allGenres.data.allGenres
  
  return (
    <div>
      <h2>books</h2>
      {genre ? <div>in genre <strong>{genre}</strong></div> : null}
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
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      {genres.map(g =>
        <button key={g} onClick={() => setGenre(g)}>{g}</button>
      )}
      <button onClick={() => setGenre(null)}>all genres</button>
    </div>
  )
}

export default Books