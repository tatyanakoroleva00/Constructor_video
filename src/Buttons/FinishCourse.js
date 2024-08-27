import React from 'react'
import styles from '../css/Buttons.module.css';
import { useState } from 'react';

const FinishCourse = ({globalData, serverDataGot, setFinishBtnClicked}) => {
  
  const finishCourseHandler = () => { //Получаем все данные, полученные от пользователя и отправляем их на сервер

    fetch('http://quiz.site/send-videocourse-data-handler', {
      method: 'POST',
      body: JSON.stringify(globalData)
    })
      .then(response => response.text())
      .then(data => {
      // console.log(data, 'dataSentToServer');
  
      setFinishBtnClicked(true);

      window.setTimeout(() => {
        window.location.reload();
      }, 3000)
      })
  }

  return (
    <>
    {!serverDataGot && <button className={styles['finish-button']} onClick={finishCourseHandler}>Завершить курс</button>}
    {serverDataGot && <button className={styles['finish-button']} onClick={finishCourseHandler}>Сохранить изменения</button>}
    </>
  )
}

export default FinishCourse