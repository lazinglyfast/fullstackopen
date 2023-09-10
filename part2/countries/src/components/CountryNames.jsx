import { PropTypes } from "prop-types"

const CountryNames = ({ countryNames }) => {
  if (countryNames === null || countryNames.length === 1) {
    return null
  }

  if (countryNames.length > 10) {
    return <p>Too many matches, specify another filter</p>
  }

  return countryNames.map(c => <p key={c}>{c}</p>)
}

CountryNames.propTypes = {
  countryNames: PropTypes.arrayOf(PropTypes.string)
}

export default CountryNames
