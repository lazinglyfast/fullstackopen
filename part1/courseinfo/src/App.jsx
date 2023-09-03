import PropTypes from 'prop-types';

let coursePropTypes = {
  course: PropTypes.shape(
    {
      name: PropTypes.string,
      parts: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string, exercises: PropTypes.number })
      )
    }
  )
}

const Header = (props) => <h1>{props.course.name}</h1>
Header.propTypes = coursePropTypes

const Content = (props) => {
  return props.course.parts.map((part, i) => {
    return <p key={i}>{part.name} {part.exercises}</p>
  })
}
Content.propTypes = coursePropTypes

const Total = (props) => <p>Number of exercises {props.course.parts.length}</p>
Total.propTypes = coursePropTypes

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
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
    ],
  }
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </>
  )
}

export default App
