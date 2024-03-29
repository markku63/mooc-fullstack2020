import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + '/' + newObject.id

  const response = await axios.put(url, newObject, config)
  return response.data
}

const remove = async oldObject => {
  const config = {
    headers: { Authorization: token },
  }
  const url = baseUrl + '/' + oldObject.id

  const response = await axios.delete(url, config)
  return response
}

export default { getAll, create, update, remove, setToken }