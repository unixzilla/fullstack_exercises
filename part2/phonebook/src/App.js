import React,{useState} from 'react'

const Person = ({person}) => {
  return(
    <p>{person.name}</p>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addPerson = (event) => {
   event.preventDefault()
   const samePerson = persons.filter(person => person.name === newName)
   if(samePerson.length > 0){
     alert(`${newName} is already added to phonebook`)
   }else{
     const newPerson = persons.concat({ name: newName })
     setPersons(newPerson)
     setNewName('')
   }
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person,i)=><Person key={i} person={person}/>)}
    </div>
  )
}
export default App;
