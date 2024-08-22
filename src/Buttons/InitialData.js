import React from 'react'

const InitialData = ({setInitialForm, initialForm}) => {
  return (
    <button onClick={() => setInitialForm(!initialForm)}>InitialData</button>
  )
}

export default InitialData