const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.filter
    case 'RESET':
      return ''
    default:
      return state
  }
}
export const notificationChange = filter => {
  return {
    type: 'SET_NOTIFICATION',
    filter,
  }
}

let timeoutID;
export const setNotification = (text,time) => {
  clearTimeout(timeoutID)
  return async dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      filter: text,
    })

    timeoutID = setTimeout(()=>{
      dispatch({
        type: 'SET_NOTIFICATION',
        filter: '',
      })
    }, time)
  }
}
export const notificationReset = () => {
  return {
    type: 'RESET',
  }
}

export default notificationReducer
