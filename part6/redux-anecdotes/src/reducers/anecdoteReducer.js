import anecdoteService from '../services/anecdotes'
/*
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]


const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)
*/
const getId = () => (100000 * Math.random()).toFixed(0)
const initialState = []
//action creator
// content from form input ver.1
export const createAnecdote = (content) => {
  return {
    type:'NEW_ANECDOTE',
    data:{
      content,
      id: getId(),
      votes: 0
    }
  }
}
// content from webservices POST response ver.2
export const createAnecdoteData = (data) => {
  return {
    type:'NEW_ANECDOTE',
    data
  }
}
// use redux thunk to abstracted the redux and the REST API call
export const createAsyncAnecdote = content => {
  return async dispatch => {

    const data = await anecdoteService.createNew(content) 
    
    dispatch({
      type:'NEW_ANECDOTE',
      data
    })
  }
}

//action creator using redux thunk
export const voteAnecdote = (id) => {
  return async dispatch => {
    await anecdoteService.vote(id)
    dispatch({
      type:'VOTE',
      data:{id}
    })
  }
}

//old version for initial
export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTE',
    data:anecdotes
  }
}

//new version use redux thunk for initial
export const initializeAsyncAnecdotes = () => {
  //redux thunk(middleware) return a function dispatch
  return async dispatch => {
    //fetches all data array from webservice REST API call
    const anecdotes = await anecdoteService.getAll()
    //dispatch action add to redux state
    dispatch({
      type: 'INIT_ANECDOTE',
      data: anecdotes
    })
  }
}

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':
      console.log(action.data.id)
     return state.map( a => ( a.id !== action.data.id ) ? a : {...a,votes:a.votes+1})
    case 'NEW_ANECDOTE':
      return [...state,action.data]
    case 'INIT_ANECDOTE':
      return action.data
    default:
      return state 
  }
}

export default reducer
