import React, { useEffect} from 'react'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Recommendations = (props) => {
  const [getResult, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    if(props.result.data) {
      console.log('genre: ', props.result.data.me.favoriteGenre)
      getResult({ variables: { genre: props.result.data.me.favoriteGenre}})
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.result])

  if(!props.show) {
    return null
  }

  if (!result.data) {
    return (
      <div>
        loading...
      </div>
    )
  }

  return (
    <div>
      <h2>recommendations</h2>
      books in your favorite genre <strong>{props.result.data.me.favoriteGenre}</strong>
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
          {result.data.allBooks.map(a =>
            <tr key={a.id}>
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

export default Recommendations