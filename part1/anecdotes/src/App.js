import { useState } from 'react'

const NextButton = ({setSelected, max}) => {
  const set = () => {
    const num = Math.floor((Math.random() * max))
    setSelected(num)
  }

  return (
    <button onClick={set}>
      next anecdote
    </button>
  )
}

const VoteButton = ({selected, points, setPoints}) => {
  const copy = [...points]
  copy[selected] += 1

  return (
    <button onClick={() => setPoints(copy)}>
      vote
    </button>
  )
}

const Anecdote = ({selected, points, anecdotes}) => (
  <>
    <p>{anecdotes[selected]}</p>
    <p>has {points[selected]} votes</p>
  </>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const mostVotesIndex = () => {
    const max = Math.max(...points)
    return points.indexOf(max)
  }

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Uint16Array(anecdotes.length))

  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote selected={selected} points={points} anecdotes={anecdotes}/>
        <VoteButton selected={selected} points={points} setPoints={setPoints}/>
        <NextButton setSelected={setSelected} max={anecdotes.length}/>    
      </div>
      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote selected={mostVotesIndex()} points={points} anecdotes={anecdotes} />
      </div>
    </>
  )
}

export default App
