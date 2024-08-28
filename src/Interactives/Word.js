import React from "react";
import { useState } from "react";
import styles from "../css/CorrectWordsChoice.module.css";
import { useEffect } from "react";
export default function Word ({order, getWordData, serverDataGot, serverData, interactiveIndex, wordIndex}) {
  const [word, setWord] = useState({
    'word_name': '',
    'status': 'no',
  });

  useEffect(() => {
    getWordData(order, word);
  }, [word]);

  const changeHandler = (event) => {

    if (event.target.value === "no" || event.target.value === "yes") {
      setWord(prev => ({...prev, 'status' : event.target.value}));
    } else {
      let { name, value } = event.target;
    setWord(prev => ({...prev, [name]: value }))
    }
  }

  useEffect(() => {
    if(serverDataGot && serverData['interactives'][interactiveIndex]) {
      let wordWithIndex = `word${wordIndex+1}`;
      let serverWord = serverData['interactives'][interactiveIndex]['receivedInfo'][wordWithIndex];
      if (serverWord) {
        setWord(serverWord);
      }
  }
}, [])

  let btnName = `word${order}`;

  return (
    <div className={styles["word-container"]}>
      <div className={styles['word-field']}>
        <span>{order}.&nbsp;</span>
        {!serverDataGot && <input className={styles.word} name="word_name" value={word['word_name']} type="text" onChange={changeHandler} />}
        {serverDataGot && <input className={styles.word} name="word_name" defaultValue={word['word_name']} type="text" onChange={changeHandler} />}
      </div>
      <div className={styles['radio-wrapper']}>
        {!serverDataGot && <input onChange={changeHandler} type="radio" id="no" name={btnName} value="no" checked={word.status === 'no'} />}
        {serverData && <input onChange={changeHandler} type="radio" id="no" name={btnName} defaultValue="no" checked={word.status === 'no'} />}
        <label htmlFor="no">Нет</label>
        {!serverDataGot && <input onChange={changeHandler} type="radio" id="yes" name={btnName} value="yes" checked={word.status === 'yes'} />}
        {serverDataGot && <input onChange={changeHandler} type="radio" id="yes" name={btnName} defaultValue="yes" checked={word.status === 'yes'} />}
        <label htmlFor="yes">Да</label>
      </div>
    </div>
  );
};