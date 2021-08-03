import React,{ useState } from 'react'

const Button = ({onClick,name}) => <button onClick={onClick} >{name}</button>
const App = () => {
  const [good,setGood] = useState(0)
  const [neutral,setNeutral] = useState(0)
  const [bad,setBad] = useState(0)

  const clickGood = () => setGood(good + 1)
  const clickNeutral = () => setNeutral(neutral + 1)
  const clickBad = () => setBad(bad + 1)
  return (
    <div>
     <h1>give feedback</h1> 
     <Button name='good' onClick={clickGood} />
     <Button name='neutral' onClick={clickNeutral} />
     <Button name='bad' onClick={clickBad} />
    </div>
  )
}
export default App;
