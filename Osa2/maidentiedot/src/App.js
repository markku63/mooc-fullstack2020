import React, {useEffect, useState} from 'react'
import axios from 'axios'
import CountryFilter from './components/CountryFilter'
import Countries from './components/Countries'

function App() {
  const [countries, setCountries] = useState([])
  const [filterString, setFilterString] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    setFilterString(event.target.value)
  }

  return (
    <div>
      <CountryFilter filterString={filterString} handleFilterChange={handleFilterChange} />
      <Countries countries={countries} filterString={filterString} setFilterString={setFilterString} />
    </div>
  );
}

export default App;
