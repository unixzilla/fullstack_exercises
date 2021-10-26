import React,{ useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Notification from './components/Notification'
import Filter from './components/Filter'

import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { initializeAsyncAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  //preload data from webservice to state
  useEffect(() => {
    /*
    // OLD
    //webservice
    anecdoteService.
      getAll()
      .then(anecdotes => dispatch(initializeAnecdotes(anecdotes)))
    */

    // NEW more abstracted
    dispatch(initializeAsyncAnecdotes())

  },[dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App
