import React from 'react';

interface CoursePartBase {
  name: string,
  exerciseCount: number;
  type: string;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CourseNormalPart extends CoursePartWithDescription {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CoursePartWithDescription {
  type: "submission";
  exerciseSubmissionLink: string;
}

interface CourseSpecialPart extends CoursePartWithDescription {
  type: "special";
  requirements: string[];
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart | CourseSpecialPart;

const assertNever = (value: never): never => {
  throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};

const Header: React.FC<{ name: string }> = ({ name }) => (
  <h1>{name}</h1>
);

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  switch (part.type) {
    case "normal":
      return (
        <div>
          <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em>
          </p>
        </div>
      );
    case "groupProject":
      return (
        <div>
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br />
            project exercises {part.groupProjectCount}
          </p>
        </div>
      );
    case "submission":
      return (
        <div>
          <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          submit to <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
          </p>
        </div>
      );
    case "special":
      return (
        <div>
          <p>
          <strong>{part.name} {part.exerciseCount}</strong><br />
          <em>{part.description}</em><br />
          required skills: {part.requirements.join(", ")}
          </p>
        </div>
      );
    default:
      return assertNever(part);
  }
}

const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <div>
    {parts.map((part) => <Part key={part.name} part={part} />)}
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
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      type: "special"
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

export default App;