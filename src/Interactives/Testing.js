import React from "react";
import QuestionCard from "./QuestionCard";
import { useState, useEffect } from "react";
import styles from '../css/Testing.module.css';

export default function Testing({ sentBtn, getData }) {
  const [questionsArr, setQuestionsArr] = useState([]);
  const [data, setData] = useState({});


//Получение всех данных по интерактиву "тестирование" и отправка в "интерактивы"
  useEffect(() => {
    getData(data);
  }, [data])

  //Добавляется новое пустое поле с вопросом и ответами по клику на "Добавить вопрос и ответы"
  const addQuestionHandler = () => {
    setQuestionsArr((prev) => [...prev, 1]);
  }
  
  //Удаляется поле с вопросом и ответами по клику на "удалить вопрос"
  const removeQuestionHandler = () => {
      let lastQuestionIndex = questionsArr.length; //Удаляем последний введенный вопрос с ответами из массива данных
      let lastQuestion = `question${lastQuestionIndex}`;
      delete data[lastQuestion];
      setQuestionsArr(questionsArr.slice(0, -1));
    }

  //Работа с данными поля "вопрос - ответы" - здесь формируется массив со всеми полученными данными о вопросах и ответах, о порядковом номер вопросов
  const questionAnswersDataHandler = (questionOrder, questionData) => {
    let question = `question${questionOrder}`;
    setData(prev => ({ ...prev, [question]: questionData })); //{1: {question: 'how is ?', 'answer1': ''}}
  };

  return (
    <div className={styles.question}>
      {questionsArr.map((question, index) => (
        <div key={question + index}>
          <QuestionCard order={index + 1} getQuestionAnswersData={questionAnswersDataHandler} />
        </div>
      ))}

      {!sentBtn &&
        <div className={styles['btns-wrapper']}>
          <button onClick={addQuestionHandler}>Добавить вопрос</button>
          <button onClick={removeQuestionHandler}>Удалить вопрос</button>
        </div>
      }
    </div>
  );
}
