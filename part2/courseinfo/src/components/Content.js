import React from 'react'
import Part from './Part'

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.reduce((result,part,i)=>{ 
        result.push(<Part key={i} part={part} />)
        return result 
      },[])}
    </div>
  )
}
export default Content