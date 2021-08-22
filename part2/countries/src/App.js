import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { nanoid } from 'nanoid'

const Weather = ({capital}) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather,setWeather] = useState([])
  useEffect(() => {
    axios.get('http://api.weatherstack.com/current?access_key='+api_key+'&query='+capital)
      .then((response) => {
        if (response.status === 200) {
          console.log(response.data)
          setWeather(response.data.current)
        }
      })
      .catch(()=>{
        console.log("Error")
      })
  }, [])
  return (
    <div>
    <h2>Weather in {capital}</h2>
    <div>temperature: {weather.temperature} Celcius</div>
    <img src={weather.weather_icons} />
    <div>wind: {weather.wind_speed} mph direction {weather.wind_dir}</div>
    </div>
  )
}
const Language = ({language}) => {
  return (
    <li>{language.name}</li>
  )
}
const Languages = ({languages})=>{
  return (
    <div>
      <h2>languages</h2>
      <ul>
        {
          languages.map(lang => {
            return <Language key={nanoid()} language={lang} />
          })
        }
      </ul>
    </div>
  )
}

const Country = ({country}) => {
  console.log(country)
  return (
    <div>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <Languages languages={country.languages} />
      <div>
        <img src={country.flag} width="130px"/>
      </div>
      <Weather capital={country.capital}/>
    </div>
  )
}
const CountryResult = ({countries,setFilterCountries}) => {
  if(countries.length > 10){
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  let country = ""
  if (countries.length === 1) {
    country = <Country country={countries[0]} />
  }else{
    country = countries.map((c) => {
      return (
        <div key={nanoid()}>
          {c.name}<button onClick={()=> 
              {
              const filtered = countries.filter(country => country.name.toLowerCase().includes(c.name.toLowerCase()))
              setFilterCountries(filtered)
              }
            } >show</button>
        </div>
      )
    })
  }
  return (
    <div>
        {country}
    </div>
  )
}
const App = () =>{
  const [newSearch,setNewSearch] = useState('')
  const [countries,setCountries] = useState([])
  const [filterCountries,setFilterCountries] = useState([])
  
  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all')
      .then((response) => {
        if (response.status === 200) {
          setCountries(response.data)
        }
      })
      .catch(()=>{
        console.log("Error")
      })
  }, [])
  const inputSearch = (event) => {
    //setNewSearch(event.target.value)
    const filtered = countries.filter(country=>country.name.toLowerCase().includes(event.target.value.toLowerCase()))
    setFilterCountries(filtered)
  }
  console.log('filter',filterCountries)
  return(
    <div>
      find countries<input onChange={inputSearch}  />
    <CountryResult countries={filterCountries} setFilterCountries={setFilterCountries} /> 
    </div>
  )
}
export default App;
