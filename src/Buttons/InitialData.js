import React from 'react'
const InitialData = ({setInitialForm, initialForm}) => {
  return (
    <button  onClick={() => {setInitialForm(!initialForm);}}>{initialForm ? 'Вперед' : 'Назад'}</button>
  )
}

export default InitialData