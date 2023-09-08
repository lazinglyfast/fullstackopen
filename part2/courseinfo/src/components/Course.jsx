import PropTypes from 'prop-types';

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

const Header = ({ course }) => <h2>{course.name}</h2>

const Content = ({ course }) => {
  return course.parts.map((part) => {
    return <Part key={part.id} part={part} />
  })
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Total = ({ course }) => {
  const exercises = course.parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <b>total of {exercises} exercises</b>
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

export default Course
