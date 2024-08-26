import React from 'react'
import styles from './InteractiveCorWords.module.css';
import { useState } from 'react';
export default function InteractiveCorWords({click}) {
  const [chosenWords, setChosenWords] = useState({});

  const [checked, setChecked] =  useState(false);
  const [result, setResult] = useState('');
  const correctWordsData = {
    "task": "Выберите все слова, которые относятся к миру Гарри Поттера",
    "word1": {
      "word-name": "Гарри Поттер",
      "status": "yes"
    },
    "word2": {
      "word-name": "Гермиона",
      "status": "yes"
    },
    "word3": {
      "word-name": "Снейп",
      "status": "yes"
    },
    "word4": {
      "word-name": "Властелин Колец",
      "status": "no"
    },
    "word5": {
      "word-name": "Человек-паук",
      "status": "no"
    },
    "word6": {
      "word-name": "Кай и Герда",
      "status": "no"
    }
  }

  let words = [];
  let correctWordsArr = [];
  for (let key in correctWordsData) {
    if (key.includes("word")) {
      let word = correctWordsData[key]["word-name"];
      words.push(word);

      let correctAnswer = correctWordsData[key]["status"];
      if (correctAnswer === "yes") {
        correctWordsArr.push(word);
      }
    }
  }

  const chooseWordHandler = (answer) => {
    if (chosenWords[answer]) {
      setChosenWords(delete chosenWords[answer]);
    } else {
      let status = !chosenWords.answer;
      setChosenWords(prev => ({...prev, [answer] : status}));
    }
  };

  const checkResultHandler = () => {
    let chosenWordsArr = [];
    for (let key in chosenWords) {
      chosenWordsArr.push(key);
    }
    console.log('chosenWordsArr', chosenWordsArr);   
    let sortedChosenWordsArr =  chosenWordsArr.sort();
    let sortedCorrectWordsArr = correctWordsArr.sort();

    setChecked(true);

    if(sortedChosenWordsArr.toString() !== sortedCorrectWordsArr.toString()) {
      setResult('Неверно!');
    } else {
      setResult('Верно!');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles['cor-words-wrapper']}>
        <p>{correctWordsData.task}</p>
        <ul>
          {words.map((answer, index) => (
            <li className={`${chosenWords[answer]? styles.selected : styles.word}`} onClick = {() => {chooseWordHandler(answer)}}
              key={answer}>
              {answer}
            </li>
          ))}
        </ul>
        <button onClick={checkResultHandler} className={styles['check-button']}>Проверить</button>
        {checked &&
        <>
        <p>Результат: {result} </p>
        <button className={styles['next-button']} onClick={click}>Продолжить</button>
        </>}
        
      </div>
    </div>
  )
}
