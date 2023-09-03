import PropTypes from 'prop-types'; // ES6
// not a fan of too much horizontal span
// just testing whether this is valid syntax
const Header = (props) => <h1>{props.course}</h1>
Header.propTypes = {
  course: PropTypes.string
}

const Part = (props) => <p>{props.name} {props.count}</p>
Part.propTypes = {
  name: PropTypes.string,
  count: PropTypes.number
}

const Total = (props) => <p>Number of exercises {props.total}</p>
Total.propTypes = {
  total: PropTypes.number,
}

const App = () => {
  const course = "Half Stack application development"
  const part1 = "Fundamentals of React"
  const exercises1 = 10
  const part2 = "Using props to pass data"
  const exercises2 = 7
  const part3 = "State of a component"
  const exercises3 = 14

  var entries = [
    { name: part1, count: exercises1 },
    { name: part2, count: exercises2 },
    { name: part3, count: exercises3 },
  ]

  return (
    <>
      <Header course={course} />
      {entries.map((e, i) => <Part key={i} name={e.name} count={e.count} />)}
      <Total total={entries.length} />
    </>
  )
}

export default App
