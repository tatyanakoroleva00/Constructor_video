import React from 'react'
import styles from '../css/Buttons.module.css'
const CoursesButton = ({btnIndex, setCurrentInteractive}) => {
  return (
    <button className={styles['courses-btn']} value={btnIndex} onClick={(event) => 
      {setCurrentInteractive(event.target.value);}}>Interactive {btnIndex + 1}</button>
  )
}

export default CoursesButton