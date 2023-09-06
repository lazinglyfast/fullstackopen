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
      <Leaderboard feedback={feedback} />
    </div>
  )
}

const Leaderboard = ({ feedback }) => {
  const { all, good, neutral, bad } = feedback
  if (all === 0) {
    return <p> No feedback given </p>
  }
  return (
    <>
      <Statistics stat={good} name="good" />
      <Statistics stat={neutral} name="neutral" />
      <Statistics stat={bad} name="bad" />
      <Statistics stat={all} />
      <Statistics stat={(good - bad) / all} />
      <Statistics stat={good / all} displayAsPercentage />
    </>
  )
}
Leaderboard.propTypes = {
  feedback: PropTypes.shape({
    all: PropTypes.number,
    good: PropTypes.number,
    neutral: PropTypes.number,
    bad: PropTypes.number,
  }),
}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>
Button.propTypes = {
  handleClick: PropTypes.func,
  text: PropTypes.string,
}

const Statistics = ({ stat, name, displayAsPercentage }) => {
  if (displayAsPercentage) {
    return <p> {name} {stat * 100} % </p>
  }
  return <p> {name} {stat} </p>
}
Statistics.propTypes = {
  stat: PropTypes.number,
  name: PropTypes.string,
  displayAsPercentage: PropTypes.bool,
}

export default App
