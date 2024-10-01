import React from 'react'
import styles from '../css/Buttons.module.css'; 
import { useState } from 'react';
const CoursesButton = ({btnIndex, setCurrentInteractive, index, setActiveBtn, activeBtn}) => {

  return (
    <button className={`${activeBtn === index ? styles['active-btn'] : styles['courses-btn']}`} value={btnIndex} onClick={(event) => 
      {setCurrentInteractive(event.target.value); setActiveBtn(index);}}>Interactive {btnIndex + 1}</button>
  )
}

export default CoursesButton