import React from 'react'

const InitialDataForm = ({globalData, setGlobalData}) => {
  return (
    <div>
        <label>Заголовок&nbsp;</label>
          <input
            type="text"
            name="heading"
            value={globalData.heading}
            onChange={(event) => setGlobalData((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
          />
          <label>URL видео&nbsp;</label>
          <input
            type="text"
            name="url"
            value={globalData.url}
            onChange={(event) => setGlobalData((prev) => ({ ...prev, [event.target.name]: event.target.value }))}
          />
    </div>
  )
}

export default InitialDataForm