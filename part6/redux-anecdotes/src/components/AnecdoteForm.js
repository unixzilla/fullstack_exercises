import React from 'react'
import { connect } from 'react-redux'
import {  createAsyncAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // OLD
    //const newAnecdote = await anecdoteService.createNew(content)
    //dispatch(createAnecdoteData(newAnecdote))

    // NEW abstracted REST call
    //dispatch(createAsyncAnecdote(content))
    props.createAsyncAnecdote(content)
    //NEW
    //dispatch(setNotification(`you added '${content}'`,5000))
    props.setNotification(`you added '${content}'`,5000)
    //OLD
    //update the state of notification
    //dispatch(notificationChange(`you added '${content}'`))

    //after 5 seconds reset the notification
    //setTimeout(()=>dispatch(notificationReset()),5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
    </>
  )
}
const mapDispatchToProps = {
  createAsyncAnecdote,
  setNotification
}

const ConnectedAnecdoteForm = connect(null,mapDispatchToProps)(AnecdoteForm)
export default ConnectedAnecdoteForm
