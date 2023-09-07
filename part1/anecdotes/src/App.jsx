import { useState } from 'react'
import { PropTypes } from 'prop-types'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))

  const handleAnecdoteClick = () => {
    // real is in [0, anecdotes.length) *math interval notation*
    const real = Math.random() * anecdotes.length
    // integer is in { 0, 1, 2, ..., anecdotes.length-1 } *math set notation*
    const integer = Math.floor(real)
    setSelected(integer)
  }

  const handleVoteClick = () => {
    const clonedVotes = [...votes]
    clonedVotes[selected] += 1
    setVotes(clonedVotes)
  }

  const getIndexOfMostVotedAnecdote = () => {
    let iMax = 0
    let voteMax = votes[0]
    // console.log(iMax, voteMax, anecdotes[0])
    for (const [i, vote] of votes.entries()) {
      if (vote > voteMax) {
        iMax = i
        voteMax = vote
      }
    }
    return iMax
  }

  const indexOfMostVotedAnecdote = getIndexOfMostVotedAnecdote()
  const mostVotedAnecdote = anecdotes[indexOfMostVotedAnecdote]
  const mostVotedAnecdoteVotes = votes[indexOfMostVotedAnecdote]

  const selectedAnecdote = anecdotes[selected]
  const selectedAnecdoteVotes = votes[selected]
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{selectedAnecdote}</p>
      <p>has {selectedAnecdoteVotes} {formatVotes(selectedAnecdoteVotes)}</p>
      <button onClick={handleAnecdoteClick}>next anecdote</button>
      <button onClick={handleVoteClick}>vote</button>
      <Leaderboard mostVotedAnecdote={mostVotedAnecdote} mostVotedAnecdoteVotes={mostVotedAnecdoteVotes} />
    </div>
  )
}

const formatVotes = (votes) => {
  if (votes === 1) {
    return "vote"
  }
  return "votes"
}

const Leaderboard = ({ mostVotedAnecdote, mostVotedAnecdoteVotes }) => {
  if (mostVotedAnecdoteVotes === 0) {
    return <></>
  }

  return (
    <>
      <h2>Anecdote with most votes</h2>
      <p>{mostVotedAnecdote}</p>
      <p>has {mostVotedAnecdoteVotes} {formatVotes(mostVotedAnecdoteVotes)}</p>
    </>
  )
}
Leaderboard.propTypes = {
  mostVotedAnecdote: PropTypes.string,
  mostVotedAnecdoteVotes: PropTypes.number,
}

export default App
