import { useState } from 'react'
import { PropTypes } from 'prop-types'

const App = () => {
  let anecdotesInitialState = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  anecdotesInitialState = anecdotesInitialState.map(anecdote => {
    return {
      text: anecdote,
      votes: 0,
    }
  })

  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState(anecdotesInitialState)

  const handleRandomClick = () => {
    // real is in [0, anecdotes.length) *math interval notation*
    const real = Math.random() * anecdotesInitialState.length
    // integer is in { 0, 1, 2, ..., anecdotes.length-1 } *math set notation*
    const integer = Math.floor(real)
    setSelected(integer)
  }

  const handleVoteClick = () => {
    const clonedAnecdotes = [...anecdotes]
    clonedAnecdotes[selected].votes += 1
    setAnecdotes(clonedAnecdotes)
  }

  const mostVotedAnecdote = anecdotes.reduce((prev, curr) => curr.votes > prev.votes ? curr : prev)
  const randomAnecdote = anecdotes[selected]

  return (
    <div>
      <Display title="Anecdote of the day" text={randomAnecdote.text} votes={randomAnecdote.votes} />
      <button onClick={handleRandomClick}>next anecdote</button>
      <button onClick={handleVoteClick}>vote</button>
      <Leaderboard title="Anecdote with most votes" text={mostVotedAnecdote.text} votes={mostVotedAnecdote.votes} />
    </div>
  )
}

const Display = ({ title, text, votes }) => {
  const formatVotes = (votes) => {
    if (votes === 1) {
      return "vote"
    }
    return "votes"
  }

  return (
    <>
      <h2>{title}</h2>
      <p>{text}</p>
      <p>has {votes} {formatVotes(votes)}</p>
    </>
  )
}
const displayPropTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  votes: PropTypes.number,
}
Display.propTypes = displayPropTypes

const Leaderboard = ({ title, text, votes }) => {
  if (votes === 0) {
    return <></>
  }
  return <Display title={title} text={text} votes={votes} />
}
Leaderboard.propTypes = displayPropTypes

export default App
