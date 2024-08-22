import React from 'react'

const CoursesButton = ({btnIndex, setCurrentInteractive}) => {
  return (
    <button value={btnIndex} onClick={(event) => setCurrentInteractive(event.target.value)}>Interactive {btnIndex + 1}</button>
  )
}

export default CoursesButton