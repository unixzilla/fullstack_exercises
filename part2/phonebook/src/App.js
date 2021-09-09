import React,{useState,useEffect} from 'react'
import phonebookService from './services/phonebook'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'

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
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ notificationStyle, setNotificationStyle ] = useState('error green')

  const removePersonClick = (id) => {
    const samePerson = persons.find(person => person.id === id)
    if(samePerson.id.length > 0){
      if(window.confirm(`Delete ${samePerson.name}?`)){
        phonebookService.removePerson(samePerson.id)
          .then(removedData => {
            setPersons(persons.filter(person => person.id !== id))
          })
          .catch(error => {
            //set state
            setNotificationStyle('error red')
            setErrorMessage(`Information of ${samePerson.name} has already been removed from server`)
            setPersons(persons.filter(person => person.id !== id))
            setTimeout(() => {
             setErrorMessage(null) 
            setNotificationStyle('error green')
            }, 2000);
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
         setErrorMessage(`Added ${newData.name}`)
         setPersons(persons.concat(newData))
         setTimeout(() => {
          setErrorMessage(null) 
         }, 2000);
       })
       .catch(error => {
         console.log(error)
         setErrorMessage('Error')
         setTimeout(() => {
          setErrorMessage(null) 
         }, 2000);
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
      <Notification message={errorMessage} className={notificationStyle}/>
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
