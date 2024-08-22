import React, { useEffect } from 'react'
import { useState } from 'react';
import styles from '../css/ExternalSourceLink.module.css';
const ExternalSourceLink = ({getData}) => {
  const [data, setData] = useState({})
  const changeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getData(data);
  }, [data]);

  return (
    <div>
    <form className={styles["external-source-form"]}>
      <p>Описание ссылки: &nbsp;</p>
      <textarea
        placeholder="Введите текст для ссылки"
        name="external_source_link_description"
        // value={interactiveData["external_source_link_description"]}
        rows={5}
        cols={5}
        onChange={changeHandler}
        required
      ></textarea>
      <p>Ссылка на внешний ресурс / PDF-документ:&nbsp;</p>
      <input
        name="external_source_url"
        // value={interactiveData["external_source_url"]}
        onChange={changeHandler}
        type="text"
        placeholder="URL: https://"
        required
      />
    </form>
  </div>
  )
}

export default ExternalSourceLink