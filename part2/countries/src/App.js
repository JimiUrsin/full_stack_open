import { useState, useEffect } from 'react'
import axios from 'axios'

function CountryFilter ({filter, setFilter}) {
  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }


  return (
    <input value={filter} onChange={handleFilterChange}/>
  )
}

function Country({country}) {
  const listLanguages = (languages) => (
    Object.keys(languages).map((key) => 
          <li key={key}>{languages[key]}</li>
    )
  )

  return (
    <div>
      <h3>{country.name.common}</h3>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <h5>Languages:</h5>
      <ul>
        {listLanguages(country.languages)}
      </ul>
      <img src={country.flags.png} />
    </div>
  )
}

function Countries ({setFilter, filterCountries}) {
  const filtered = filterCountries()

  if (filtered.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  if (filtered.length > 1) {
    return filtered.map(country => 
      <div key={country.cca3}>
        {country.name.common}
        <button key={country.cca3} onClick={() => setFilter(country.name.common)}>
          show
        </button>
      </div>
    )
  }

  if (filtered.length === 1) {
    return <Country country={filtered[0]} />
  }

  return <p>No countries found</p>
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const filterCountries = () =>
    countries.filter(country =>
      country.name.common.toUpperCase().includes(filter.toUpperCase()))

  return (
    <>
      <CountryFilter filter={filter} setFilter={setFilter} />
      <Countries setFilter={setFilter} filterCountries={filterCountries} />
    </>
  )
}

export default App;
