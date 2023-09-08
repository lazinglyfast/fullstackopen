import PropTypes from 'prop-types';

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      }
    ],
  }
  return (
    <Course course={course} />
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => <h1>{course.name}</h1>

const Content = ({ course }) => {
  return course.parts.map((part) => {
    return <Part key={part.id} part={part} />
  })
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({ course }) => {
  return (
    <p>Number of exercises {course.parts.reduce((sum, part) => {
      return sum + part.exercises
    }, 0)}</p>
  )
}

let partPropTypes = PropTypes.shape({
  name: PropTypes.string,
  exercises: PropTypes.number,
  id: PropTypes.number,
})

let coursePropTypes = {
  course: PropTypes.shape(
    {
      id: PropTypes.number,
      name: PropTypes.string,
      parts: PropTypes.arrayOf(partPropTypes)
    }
  )
}

Course.propTypes = coursePropTypes
Header.propTypes = coursePropTypes
Content.propTypes = coursePropTypes
Part.propTypes = { part: partPropTypes }
Total.propTypes = coursePropTypes

export default App
