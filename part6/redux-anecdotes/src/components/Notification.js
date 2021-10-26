import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notification
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
const mapStateToProps = (state) => {
  return {
    notification:state.notification
  }
}

const ConnectedNotification = connect(mapStateToProps)(Notification)
export default ConnectedNotification
