import React,{ useState } from "react";

const Button = ({text,onClick}) => {
  return (
     <><button onClick={onClick} >{text}</button></>
  )
}
const Votes = ({votes}) => {
  return (
     <div>has {votes} votes</div>
  )
}
const Anecdote = ({anecdotes,selected}) => {
  return (
    <div>{anecdotes[selected]}</div>
  )
}
const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blod tests when dianosing patients'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(7)).map(Number.prototype.valueOf,0))

  const nextAnecdote = () => {
    const index = Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }
  const voteSelected = () => {
    const voted = [...votes] 
    voted[selected] += 1 
    setVotes(voted)
  }
  const mostIndex = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0)
  return (
    <div>
      <h1>Anecdote of the day</h1>
     <Anecdote anecdotes={anecdotes} selected={selected} />
     <Votes votes={votes[selected]}/> 
     <Button onClick={voteSelected} text="vote" />
     <Button onClick={nextAnecdote} text="next anecdote" />
      <h1>Anecdote with most votes</h1>
     <Anecdote anecdotes={anecdotes} selected={mostIndex} />
     <Votes votes={votes[mostIndex]}/> 
    </div>
  )
}
export default App;
