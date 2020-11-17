import React from 'react'
import Course from './components/Course'

const Courses = ({ courses }) => {
  return (
    <div>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </div>
  )
}

const App = ({ courses }) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <Courses courses={courses} />
    </div>
  )
}

export default App