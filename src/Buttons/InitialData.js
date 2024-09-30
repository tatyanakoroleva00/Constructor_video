import React from 'react'
import { useState } from 'react';
import styles from '../css/StateOne.module.css';
const InitialData = ({setInitialForm, initialForm}) => {
  return (
    <button  onClick={() => {setInitialForm(!initialForm);}}>Проект</button>
  )
}

export default InitialData