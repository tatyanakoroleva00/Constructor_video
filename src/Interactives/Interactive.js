import React from "react";
import styles from "../css/Interactive.module.css";
import { useState, useEffect } from "react";
import Testing from "./Testing";
import ExternalSourceLink from "./ExternalSourceLink";
import CorrectWordsChoice from "./CorrectWordsChoice";

const Interactive = ({ interactiveIndex, currentInteractive, setInteractives, serverData, serverDataGot, initialForm }) => {
  const [interactiveData, setInteractiveData] = useState({});
  const [sentBtn, setSentBtn] = useState(false);

  useEffect(() => {
    if(serverDataGot && serverData['interactives'][interactiveIndex]) {
      setInteractiveData(serverData['interactives'][interactiveIndex]);
    }
  }, [serverData['interactives']])

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setInteractiveData((prev) => ({ ...prev, [name]: value }));
  }
  const sendToGlobalDataHandler = () => {
    setInteractives((prev) => [...prev, interactiveData]);
    setSentBtn(true);
  };
  const getInteractiveDataHandler = (receivedInfo) => {
    setInteractiveData(prev => ({ ...prev, receivedInfo }));
  };

  return (
    <div className={`${initialForm && styles.invisible }`}>
    <div
      className={`${interactiveIndex !== +currentInteractive && styles.invisible}`}>
      <section>

      {!serverDataGot && <div className={styles.block}>
            <label>Тип интерактива:&nbsp;</label>
            <select name="interactive_type" onChange={changeHandler} defaultValue='Выберите из списка'>
              <option hidden value="Выберите из списка"> Выберите из списка...</option>
              <option value="testing">Тестирование</option>
              <option value="correctWordsChoice">Выбор правильных слов</option>
              <option value="externalSourceLink">
                Ссылка на внешний источник
              </option>
            </select>
          </div>
        }
        {!serverDataGot && <div className={styles.block}>
            <label>TimeCode:&nbsp;</label>
            <input
              type="text"
              name="time_code"
              onChange={changeHandler}
              placeholder='00:05'
              required
              maxLength={5}
            />
          </div>}

        {serverDataGot &&
          <div className={styles.block}>
            <label>Тип интерактива:&nbsp;</label>
            <select name="interactive_type" onChange={changeHandler} disabled={serverData['interactives'][interactiveIndex]? true : false} 
            defaultValue={`${serverData['interactives'][interactiveIndex]? serverData['interactives'][interactiveIndex]['interactive_type'] : interactiveData['interactive_type']}`}>
              <option hidden value="Выберите из списка"> Выберите из списка...</option>
              <option value="testing">Тестирование</option>
              <option value="correctWordsChoice">Выбор правильных слов</option>
              <option value="externalSourceLink">
                Ссылка на внешний источник
              </option>
            </select>
          </div>
        }

        {serverDataGot && <div className={styles.block}>
            <label>TimeCode:&nbsp;</label>
            <input defaultValue={`${serverData['interactives'][interactiveIndex] ? serverData['interactives'][interactiveIndex]['time_code'] : ''}`}
              type="text"
              name="time_code"
              onChange={changeHandler}
              placeholder='00:05'
              required
              maxLength={5}
            />
          </div>}
      </section>
      <section>
        {interactiveData["interactive_type"] === "testing" && <Testing interactiveIndex={interactiveIndex} sentBtn={sentBtn} serverData={serverData} serverDataGot={serverDataGot} getData={getInteractiveDataHandler} />}
        {interactiveData["interactive_type"] === "correctWordsChoice" && (
          <CorrectWordsChoice sentBtn={sentBtn} serverData={serverData} serverDataGot={serverDataGot} getData={getInteractiveDataHandler} interactiveIndex={interactiveIndex} />
        )}
        {interactiveData["interactive_type"] === "externalSourceLink" && (
          <ExternalSourceLink sentBtn={sentBtn} serverData={serverData} serverDataGot={serverDataGot} getData={getInteractiveDataHandler} interactiveIndex={interactiveIndex} />
        )}
      </section>
      {!sentBtn && <button onClick={sendToGlobalDataHandler}>Сохранить</button>}
      {sentBtn && <p>Сохранено!</p>}
    </div>
    </div>
  );
};

export default Interactive;
