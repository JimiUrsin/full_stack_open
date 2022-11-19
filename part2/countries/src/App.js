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
      <Weather city={country.capital} />
    </div>
  )
}

function Weather({city, countryCode}) {
  const [weather, setWeather] = useState({})

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&units=metric&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)
      })
  })

  if ('main' in weather) {
    return (
      <div>
        <p>temperature {weather.main.temp} celsius</p>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}/>
        <p>wind {weather.wind.speed} m/s</p>
      </div>
    )
  }

  return <div/>
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
