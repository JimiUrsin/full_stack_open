import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const FeedbackButton = ({amt, setAmt, name}) => (
  <button onClick={() => setAmt(amt + 1)}>
    {name}
  </button>
)

const Statistics = ({good, neutral, bad}) => (
  <>
    <Title title="statistics" />
    <ul>
      <li>good {good}</li>
      <li>neutral {neutral}</li>
      <li>bad {bad}</li>
    </ul>
  </>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title="give feedback" />
      <FeedbackButton amt={good} setAmt={setGood} name="good" />
      <FeedbackButton amt={neutral} setAmt={setNeutral} name="neutral" />
      <FeedbackButton amt={bad} setAmt={setBad} name="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App