import React from 'react'

const FinishCourse = ({globalData}) => {
  
  const finishCourseHandler = () => { //Получаем все данные, полученные от пользователя и отправляем их на сервер

    fetch('http://quiz.site/send-videocourse-data-handler', {
      method: 'POST',
      body: JSON.stringify(globalData)
    })
      .then(response => response.text())
      .then(data => {
      console.log(data, 'dataSentToServer');

      window.setTimeout(() => {
        window.location.reload();
      }, 1000)

      })
  }

  return (
    <button onClick={finishCourseHandler}>FinishCourse</button>
  )
}

export default FinishCourse