import React from 'react'
import styles from './css/StateOne.module.css';

const InitialDataForm = ({globalData, setGlobalData}) => {
  return (
    <div className={styles['initial-data-form']}>
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