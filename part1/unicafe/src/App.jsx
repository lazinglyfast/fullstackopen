import { useState } from 'react'
import PropTypes from 'prop-types';

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: good + neutral + bad
  }

  return (
    <div>
      <h2>give feedback</h2>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <h2>statistics</h2>
      <Statistics feedback={feedback} />
    </div>
  )
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
}

const Statistics = ({ feedback }) => {
  const { all, good, neutral, bad } = feedback
  if (all === 0) {
    return <p> No feedback given </p>
  }
  return (
    <table>
      <tbody>
        <StatisticsLine text="good" value={good} />
        <StatisticsLine text="neutral" value={neutral} />
        <StatisticsLine text="bad" value={bad} />
        <StatisticsLine text="all" value={all} />
        <StatisticsLine text="average" value={(good - bad) / all} />
        <StatisticsLine text="positive" value={(good / all) * 100 + " %"} />
      </tbody>
    </table>
  )
}
Statistics.propTypes = {
  feedback: PropTypes.shape({
    all: PropTypes.number,
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
  }),
}

const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}
StatisticsLine.propTypes = {
  text: PropTypes.string,
  value: PropTypes.number,
}

export default App
