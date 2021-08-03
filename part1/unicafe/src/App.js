import React,{ useState } from 'react'
const StatisticLine = ({text,value}) => {
  return (
        <tr>
          <td>{text}</td>
          <td>{value}</td>
        </tr>
  )
}
const Statistics = ({good,neutral,bad}) => {
  const all = good+neutral+bad 
  const average = ((good-bad)>0)?(good-bad)/all :0
  const positive = (all>0)?(good/all)*100:0
  
  if(all > 0){

    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticLine text="good" value={good} />
            <StatisticLine text="neutral" value={neutral} />
            <StatisticLine text="bad" value={bad} />
            <StatisticLine text="all" value={good + neutral + bad} />
            <StatisticLine text="average" value={average.toFixed(1) + "%"} />
            <StatisticLine text="positive" value={positive.toFixed(1) + "%"} />
          </tbody>
        </table>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <p>No feedback given</p>
    </div>
  )
}
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
     <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}
export default App;
