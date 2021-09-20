import React, { useState , useEffect } from 'react'
import axios from 'axios'
import Country from './components/Country'
import './App.css';

function App() {
  const [country, setCountry ] = useState([]) 
  const [input, setInput] = useState('')
  
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountry(response.data)
      })
  },[])

  const hadleSearch = (event) =>{
    setInput(event.target.value)
  } 


  return (
    <div>
    <div> find countries <input value={input} onChange={hadleSearch}/></div>
    <Country country={country} input={input} setInput={setInput} />
    </div>
    )
}

export default App;
