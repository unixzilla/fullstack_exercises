import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
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
