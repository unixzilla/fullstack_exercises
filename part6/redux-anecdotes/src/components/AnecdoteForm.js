import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAnecdote, createAsyncAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset, setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {

  const dispatch = useDispatch()

  const addNewAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // OLD
    //const newAnecdote = await anecdoteService.createNew(content)
    //dispatch(createAnecdoteData(newAnecdote))

    // NEW abstracted REST call
    dispatch(createAsyncAnecdote(content))

    //NEW
    dispatch(setNotification(`you added '${content}'`,5000))
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

export default AnecdoteForm
