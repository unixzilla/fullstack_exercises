import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector( state => 
    state.anecdotes.filter( 
      str => str.content.toLowerCase().includes( 
        state.filter.toLowerCase() 
      ) 
    )
  )
  const dispatch = useDispatch()

  const vote = (id) => {
    //update the state of anecdote
    dispatch(voteAnecdote(id))

    //find out content
    const anecdote = anecdotes.find(state => state.id === id)

    //update the state of notification
    dispatch(notificationChange('you voted \''+anecdote.content+'\''))

    //after 5 seconds reset the notification
    setTimeout(()=>dispatch(notificationReset()),5000)
  }
  
  ////////////////////////////////////////
  //sort order by votes(mutates) method 1 sort function
  ////////////////////////////////////////
  anecdotes.sort((firstItem,secondItem) => firstItem.votes - secondItem.votes).reverse()
  ///////////////////////////////
  // end method 1 
  ///////////////////////////////

  ////////////////////////////////////////
  //sort order by votes(immutate) method 2 reduce function
  ////////////////////////////////////////
  const sortingReducer = (accumulator, item) => {
    //compare item votes
    const nextIndex = accumulator.findIndex( i => item.votes < i.votes )
    //define index
    const index = nextIndex > -1 ? nextIndex : accumulator.length
    //splice(start position, deleteCount, item) and update the accumulator
    accumulator.splice(index, 0, item)
    //add back to accumulator
    return accumulator
  }
   
  const sortedAnecdotes = anecdotes.reduce(sortingReducer,[])
  sortedAnecdotes.reverse()
  ///////////////////////////////
  // end method 2
  ///////////////////////////////
  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

export default AnecdoteList
