import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )

}

const StatisticsLine = (props) => {
  return (
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad ===0 ) {
    return (
      <div>
        <h1>statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <StatisticsLine text='good' value={props.good} />
      <StatisticsLine text='neutral' value={props.neutral} />
      <StatisticsLine text='bad' value={props.bad} />
      <StatisticsLine text='all' value={props.good + props.neutral + props.bad} />
      <StatisticsLine text='average' value={(props.good - props.bad)/(props.good + props.neutral + props.bad)} />
      <StatisticsLine text='positive' value={100.0 * (props.good)/(props.good + props.neutral + props.bad) + '%'} />
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='give feedback' />
      <Button onClick={() => setGood(good + 1)} text='good' />
      <Button onClick={() => setNeutral(neutral + 1)} text='neutral' />
      <Button onClick={() => setBad(bad + 1)} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);
