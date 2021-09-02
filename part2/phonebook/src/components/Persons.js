import React from 'react'
import Person from './Person'
const Persons = ({personToShow,removeBtn})=>{
  return (
    <div>
      {personToShow.map((person,i)=><Person key={i} person={person} removeBtn={removeBtn}/>)}
    </div>
  )
}

export default Persons