import React,{useState,useEffect} from 'react'
import axios from 'axios'



const Person = ({person}) => {
  return(
    <div>{person.name} {person.number}</div>
  )
}
const Persons = ({personToShow})=>{
  return (
    <div>
      {personToShow.map((person,i)=><Person key={i} person={person}/>)}
    </div>
  )
}

const Filter = ({newSearch,setSearch}) => {
  return (
    <div>
        filter shown with<input value={newSearch} onChange={(event) => setSearch(event.target.value)} />
    </div>
  )
}

const PersonForm = ({addPerson,newName,newNumber,setNewName,setNewNumber}) => {

  return (
    <div>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={(event)=>setNewName(event.target.value)}/>
        </div>
        <div>number: <input value={newNumber} onChange={(event)=>setNewNumber(event.target.value)}/></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>

    </div>
  )
}

const App = () => {
  /*
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
*/
  const [persons, setPersons] = useState([])
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        if (response.status === 200) {
          setPersons(response.data)
        }
      })
  }
    , [])
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
      <h2>Phonebook</h2>
      <Filter search={newSearch} setSearch={setSearch} />
      <h3>Add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        setNewName={setNewName}
        setNewNumber={setNewNumber}
      />
      <h3>Numbers</h3>
      <Persons personToShow={personToShow} />
    </div>
  )
}
export default App;
