import React from 'react';
import ReactDOM from 'react-dom';

interface CoursePart {
  name: string,
  exerciseCount: number
}

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <div>
    {parts.map((part, idx) => <p key={idx}>{part.name} {part.exerciseCount}</p>)}
  </div>
);

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <p>
    Number of exercises{" "}
    {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>
);

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
