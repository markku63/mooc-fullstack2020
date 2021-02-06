import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if ( !notification || !notification.message ) {
    return null
  }

  return <div className="container">
    <Alert variant={notification.type === 'success' ? 'success' : 'danger'}>
      {notification.message}
    </Alert>
  </div>
}

export default Notification