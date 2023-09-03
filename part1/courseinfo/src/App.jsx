import PropTypes from 'prop-types'; // ES6
// not a fan of too much horizontal span
// just testing whether this is valid syntax
const Header = (props) => <h1>{props.course}</h1>
Header.propTypes = {
  course: PropTypes.string
}

let partsPropTypes = {
  parts: PropTypes.arrayOf(
    PropTypes.shape({ name: PropTypes.string, exercises: PropTypes.number })
  )
}

const Content = (props) => {
  return (props.parts.map((part, i) => <p key={i}>{part.name} {part.exercises}</p>))
}
Content.propTypes = partsPropTypes

const Total = (props) => <p>Number of exercises {props.parts.length}</p>
Total.propTypes = partsPropTypes

const App = () => {
  const course = "Half Stack application development"
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    }
  ]
  return (
    <>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </>
  )
}

export default App
