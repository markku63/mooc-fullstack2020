import React from 'react';
import ReactDOM from 'react-dom';

interface CoursePartBase {
  name: string,
  exerciseCount: number
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CoursePartWithDescription {
  name: "State handling";
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartFour;

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.name) {
    case "Fundamentals":
      return <p>{part.name} {part.exerciseCount} {part.description}</p>;
    case "Using props to pass data":
      return <p>{part.name} {part.exerciseCount} {part.groupProjectCount}</p>;
    case "Deeper type usage":
      return <p>{part.name} {part.exerciseCount} {part.description} <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a></p>;
    case "State handling":
      return <p>{part.name} {part.exerciseCount} {part.description}</p>
    default:
      return assertNever(part);
  }
}

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <div>
    {parts.map((part, idx) => <Part key={idx} part={part} />)}
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
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "State handling",
      exerciseCount: 13,
      description: "Handle your state like a pro"
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
