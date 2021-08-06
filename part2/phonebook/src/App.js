import React,{useState} from 'react'

const Person = ({person}) => {
  return(
    <div>{person.name} {person.number}</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newSearch, setSearch ] = useState('')
  const addPerson = (event) => {
   event.preventDefault()
   const samePerson = persons.filter(person => person.name === newName)
   if(samePerson.length > 0){
     alert(`${newName} is already added to phonebook`)
   }else{
     const newPerson = persons.concat({ name: newName,number: newNumber })
     setPersons(newPerson)
     setNewName('')
     setNewNumber('')
   }
  }
  const personToShow = newSearch ? persons.filter((p)=>{
      return p.name.toLowerCase().includes(newSearch.toLowerCase())
  }) : persons
  return (
    <div>
      <div>debug: {newName} {newNumber}</div>
      <h2>Phonebook</h2>
      <div>
        filter shown with<input value={newSearch} onChange={(event) => setSearch(event.target.value)} />
      </div>
      <form onSubmit={addPerson}>
        <h2>Add a new</h2>
        <div>
          name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}/>
        </div>
        <div>number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {personToShow.map((person,i)=><Person key={i} person={person}/>)}
    </div>
  )
}
export default App;
