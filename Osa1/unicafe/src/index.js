import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Header = ({text}) => {
  return (
    <div>
      <h1>{text}</h1>
    </div>
  )

}

const Stats = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
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
      <Stats good={good} neutral={neutral} bad={bad} /> 
    </div>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
);
