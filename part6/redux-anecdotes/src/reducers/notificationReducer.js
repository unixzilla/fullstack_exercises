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

export const notificationReset = () => {
  return {
    type: 'RESET',
  }
}

export default notificationReducer
