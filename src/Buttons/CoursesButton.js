import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from '../css/Buttons.module.css';
const CoursesButton = ({ btnIndex, setCurrentInteractive, index, setActiveBtn, activeBtn, interactivesNamesArr, serverData, serverDataGot }) => {
  console.log(btnIndex, 'btnindex');
  return (
    
    <>
      {!serverDataGot && <button className={`${activeBtn === index ? styles['active-btn'] : styles['courses-btn']}`} value={btnIndex} onClick={(event) => { setCurrentInteractive(btnIndex); setActiveBtn(index); }}>{interactivesNamesArr.length > 0 && interactivesNamesArr[index]}</button>}
      {serverDataGot && <button className={`${activeBtn === index ? styles['active-btn'] : styles['courses-btn']}`} value={btnIndex} onClick={(event) => { setCurrentInteractive(btnIndex); setActiveBtn(index); }}>{serverData['interactives'][index] ? serverData['interactives'][index]['interactive_name'] : interactivesNamesArr[index] }</button>}
    </>
  )
}

export default CoursesButton