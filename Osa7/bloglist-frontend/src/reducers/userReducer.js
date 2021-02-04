import storage from '../utils/storage'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const loginUser = (username, password) => {
  return async (dispatch) => {
    let user
    try {
      user = await loginService.login({
        username, password
      })
    } catch (error) {
      user = null
      dispatch(setNotification({ message: 'wrong username/password', type: 'error' }, 5))
    }
    if(user) {
      storage.saveUser(user)
      dispatch(setNotification({ message: `${user.name} welcome back`, type: 'success' }, 5))
    }
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const loadUser = () => {
  return (dispatch) => {
    const user = storage.loadUser()
    dispatch({
      type: 'SET_USER',
      data: user
    })
  }
}

export const logoutUser = () => {
  return (dispatch) => {
    storage.logoutUser()
    dispatch({
      type: 'SET_USER',
      data: null
    })
  }
}

export default userReducer