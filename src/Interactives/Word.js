import React from "react";
import { useState } from "react";
import styles from "../css/CorrectWordsChoice.module.css";
import { useEffect } from "react";
export default function Word ({order, getWordData}) {
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

  let btnName = `word${order}`;

  return (
    <div className={styles["word-container"]}>
      <div className={styles['word-field']}>
        <span>{order}.&nbsp;</span>
        <input className={styles.word} name="word_name" value={word['word_name']} type="text" onChange={changeHandler} />
      </div>
      <div className={styles['radio-wrapper']}>
        <input onChange={changeHandler} type="radio" id="no" name={btnName} value="no" checked={word.status === 'no'} />
        <label htmlFor="no">Нет</label>
        <input onChange={changeHandler} type="radio" id="yes" name={btnName} value="yes" checked={word.status === 'yes'} />
        <label htmlFor="yes">Да</label>
      </div>
    </div>
  );
};