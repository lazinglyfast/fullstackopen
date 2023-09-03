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
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  }

  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  }

  const part3 = {
    name: "State of a component",
    exercises: 14,
  }

  var entries = [part1, part2, part3]

  return (
    <>
      <Header course={course} />
      {entries.map((e, i) => <Part key={i} name={e.name} count={e.count} />)}
      <Total total={entries.length} />
    </>
  )
}

export default App
