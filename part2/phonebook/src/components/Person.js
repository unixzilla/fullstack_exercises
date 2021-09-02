import React from 'react'

const Person = ({person,removeBtn}) => {
  return(
    <div>{person.name} {person.number}
    <button onClick={()=>removeBtn(person.id)}>delete</button>
    </div>
  )
}

export default Person