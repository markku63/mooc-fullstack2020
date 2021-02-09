  
import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [year, setYear] = useState(0)
  const [ editAuthor ] = useMutation(EDIT_AUTHOR)

  if (!props.show) {
    return null
  }
  const authors = props.authors
  
  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name, setBornTo: year}})
    setName('')
    setYear(0)
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set year of birth</h2>
      <form onSubmit={submit}>
        <div>
          <label htmlFor="name">name</label>
          <select id="name" value={name} onChange={({target}) => setName(target.value)}>
            {authors.map(a =>
              <option key={a.id} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          <label htmlFor="born">born</label>
          <input
            type="number"
            id="born"
            value={year}
            onChange={({target}) => setYear(Number(target.value))}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
