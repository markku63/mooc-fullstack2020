import React, { useState, useEffect } from "react"
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      props.notify(error.graphQLErrors[0].message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      props.setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data]) // eslint-disable-line react-hooks/exhaustive-deps
  
  if (!props.show) {
    return null
  }

  const doLogin = async (event) => {
    event.preventDefault()
    login({ variables: { username, password } })
    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={doLogin}>
      <div>
        name
        <input type="text" value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password
        <input type="password" value={password} onChange={({ target }) => setPassword(target.value)} />
      </div>
      <button type="submit">login</button>
    </form>
  )
}

export default Login