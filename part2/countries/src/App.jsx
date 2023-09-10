import { useState, useEffect } from 'react'
import CountryNames from "./components/CountryNames"
import CountryDetails from "./components/CountryDetails"
import countriesService from "./services/countriesService"

const App = () => {
  const [allCountryNames, setAllCountryNames] = useState(null)
  const [filteredCountryNames, setFilteredCountryNames] = useState(null)
  const [countryName, setCountryName] = useState(null)
  const [countryDetails, setCountryDetails] = useState(null)

  useEffect(() => {
    countriesService
      .list()
      .then((fromServerCountries) => {
        // for the purpose of the exercise let's assume 
        // we didn't get countryDetails for all countries here
        // because if we had I'd have no need for the next useEffect
        setAllCountryNames(fromServerCountries.map(c => c.name.common))
      })
  }, [])

  useEffect(() => {
    if (countryName === null) {
      setCountryDetails(null)
      return
    }
    countriesService
      .get(countryName)
      .then((fromServerCountryDetails) => {
        countriesService
          .weather(fromServerCountryDetails.latlng)
          .then((weather) => {
            console.log(weather)
            const icon = weather.weather[0].icon
            setCountryDetails({
              ...fromServerCountryDetails,
              temperature: weather.main.temp,
              wind: weather.wind.speed,
              icon: `https://openweathermap.org/img/wn/${icon}@2x.png`,

            })
          })
      })
  }, [countryName])

  const onChange = (event) => {
    const query = event.target.value
    if (!query) {
      setCountryName(null)
      return
    }
    const regExp = new RegExp(query, "i")
    // spoiled by rust, thought just countries.filter(regExp.test) would work
    const countryNames = allCountryNames.filter(c => regExp.test(c))
    setFilteredCountryNames(countryNames)
    if (countryNames.length == 1) {
      setCountryName(countryNames[0])
    } else {
      setCountryName(null)
    }
  }

  const showCountry = (selectedCountryName) => {
    setCountryName(selectedCountryName)
  }

  return (
    <div>
      find countries <input onChange={onChange} />
      <CountryNames countryNames={filteredCountryNames} showCountry={showCountry} />
      <CountryDetails countryDetails={countryDetails} />
    </div>

  )
}

export default App
