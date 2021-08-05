import React from 'react'
const Total = ({ course }) => {
  const sum = course.parts.reduce((total,part)=> total+part.exercises,0)
  return(
    <b>total of {sum} exercises </b>
  ) 
}
export default Total