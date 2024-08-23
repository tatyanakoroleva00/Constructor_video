import React from 'react'
import { useState, useEffect } from 'react';
import styles from '../css/ExternalSourceLink.module.css';
const ExternalSourceLink = ({getData, serverDataGot, serverData, interactiveIndex}) => {
  const [data, setData] = useState({
    "external_source_link_description": "",
    "external_source_url": "",
  });

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getData(data);   //OK
  }, [data])

  useEffect(() => {
    if(serverDataGot && serverData['interactives'][interactiveIndex]) {   //OK
    setData(serverData['interactives'][interactiveIndex]['receivedInfo']);
  }}, [])
  

  return (
    <div>
    <form className={styles["external-source-form"]}>
      <p>Описание ссылки: &nbsp;</p>

    {/* OK */}
    {!serverDataGot && <>   
      <textarea
        placeholder="Введите текст для ссылки"
        name="external_source_link_description"
        rows={5}
        cols={5}
        onChange={changeHandler}
        required
      ></textarea>
      <p>Ссылка на внешний ресурс / PDF-документ:&nbsp;</p>
      <input
        name="external_source_url"
        onChange={changeHandler}
        type="text"
        placeholder="URL: https://"
        required
      />
    </>}

    {/* OK */}
      {serverDataGot && <>
        <textarea
        placeholder="Введите текст для ссылки"
        name="external_source_link_description"
        rows={5}
        cols={5}
        defaultValue={data['external_source_link_description']}
        onChange={changeHandler}
        required
      ></textarea>
      <p>Ссылка на внешний ресурс / PDF-документ:&nbsp;</p>
      <input
        name="external_source_url"
        onChange={changeHandler}
        type="text"
        placeholder="URL: https://"
        defaultValue={data['external_source_url']}
        required
      />
      </>}
    </form>
  </div>
  )
}

export default ExternalSourceLink