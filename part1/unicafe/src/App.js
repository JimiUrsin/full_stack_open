import { useState } from 'react'

const Title = ({title}) => <h1>{title}</h1>

const Button = ({amt, setAmt, name}) => (
  <button onClick={() => setAmt(amt + 1)}>
    {name}
  </button>
)

const StatisticLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad == 0) {
    return <p>No feedback given</p>
  }


  const calculateAverage = () => {
    const score = good - bad
    const total = good + neutral + bad

    if (total == 0) return 0
    return score / total
  }

  const calculatePositive = () => {
    const total = good + neutral + bad
    if (total == 0) return 0
    return (good / total) * 100
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good}/>
        <StatisticLine text="neutral" value={neutral}/>
        <StatisticLine text="bad" value={bad}/>
        <StatisticLine text="average" value={calculateAverage()}/>
        <StatisticLine text="positive" value={calculatePositive() + " %"}/>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title="give feedback" />
      <Button amt={good} setAmt={setGood} name="good" />
      <Button amt={neutral} setAmt={setNeutral} name="neutral" />
      <Button amt={bad} setAmt={setBad} name="bad" />
      <Title title="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App