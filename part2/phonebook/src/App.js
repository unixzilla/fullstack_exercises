import React,{useState,useEffect} from 'react'
import phonebookService from './services/phonebook'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  useEffect(() => {
    phonebookService
      .getAll()
      .then(newEntry => {
        setPersons(newEntry)
      })
  }
    , [])
  const [ newNumber, setNewNumber ] = useState('')
  const [ newName, setNewName ] = useState('')
  const [ newSearch, setSearch ] = useState('')

  const removePersonClick = (id) => {
    const samePerson = persons.find(person => person.id === id)
    if(samePerson.id > 0){
      if(window.confirm(`Delete ${samePerson.name}?`)){
        phonebookService.removePerson(samePerson.id)
          .then(removedData => {
            setPersons(persons.filter(person => person.id !== id))
          })
          .catch(error => {
            console.log(error)
          })
      }
    }
  }
  const addPerson = (event) => {
   event.preventDefault()
   const samePerson = persons.filter(person => person.name === newName)
   const newEntry = { name: newName,number: newNumber }
   if(samePerson.length > 0){
     if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        phonebookService.updatePerson(newEntry,samePerson[0].id)
        .then(newData => {
            setPersons(persons.map(person => (person.name === newData.name)?newData:person))
        })
        .catch(error => {
          console.log(error)
        })
       setNewName('')
       setNewNumber('')
     }
   }else{
     phonebookService.addPerson(newEntry)
       .then(newData => {
         setPersons(persons.concat(newData))
       })
       .catch(error => {
         console.log(error)
       })
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
      <Persons personToShow={personToShow} removeBtn={removePersonClick} />
    </div>
  )
}
export default App;
