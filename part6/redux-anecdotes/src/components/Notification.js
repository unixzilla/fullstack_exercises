import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  let style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  if(notification){
     style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  }else{
     style = {
      border: 'solid',
      padding: 10,
      display: 'none',
      borderWidth: 1

    }
  }
  return (
    <div style={style}>
    {notification} 
    </div>
  )
}

export default Notification
