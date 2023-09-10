import { PropTypes } from "prop-types"

const CountryDetails = ({ countryDetails }) => {
  if (countryDetails === null) {
    return null
  }

  return (
    <div>
      <h2>{countryDetails.name.common}</h2>
      <p>capital(s):</p>
      <ul>{countryDetails.capital.map(c => <li key={c}>{c}</li>)}</ul>
      <p>area: {countryDetails.area} km2</p>
      <h3>languages:</h3>
      <ul>
        {Object.values(countryDetails.languages).map((v) => <li key={v}>{v}</li>)}
      </ul>
      <img src={countryDetails.flags.png} />
    </div>
  )
}

CountryDetails.propTypes = {
  countryDetails: PropTypes.shape({
    name: PropTypes.shape({
      common: PropTypes.string,
    }),
    capital: PropTypes.arrayOf(PropTypes.string),
    area: PropTypes.number,
    languages: PropTypes.arrayOf(PropTypes.string),
    flags: PropTypes.shape({
      png: PropTypes.string,
    }),
  })
}

export default CountryDetails
