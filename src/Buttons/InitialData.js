import React from 'react'
import { useState } from 'react';
const InitialData = ({setInitialForm, initialForm}) => {
const [open, setOpen] = useState(false);
  return (
    <button onClick={() => setInitialForm(!initialForm)}>Курс</button>
  )
}

export default InitialData