import { PropTypes } from "prop-types"

const Phonebook = ({ query, persons }) => {
  return (
    <>
      <h2>Numbers</h2>
      {
        persons
          .filter((person) => query.test(person.name))
          .map((person) => <Entry key={person.id} person={person} />)
      }
    </>
  )
}

const Entry = ({ person }) => <div>{person.name} {person.number}</div>

const personPropTypes = PropTypes.shape({
  name: PropTypes.string,
  id: PropTypes.number,
  number: PropTypes.string,
})

Phonebook.propTypes = {
  query: PropTypes.instanceOf(RegExp),
  persons: PropTypes.arrayOf(personPropTypes),
}

Entry.propTypes = {
  person: personPropTypes
}

export default Phonebook
