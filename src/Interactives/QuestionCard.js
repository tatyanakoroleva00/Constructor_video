import React from 'react'
import styles from '../css/Testing.module.css'
import { useState } from 'react'
import { useEffect } from 'react';

export default function QuestionCard({ order, getQuestionAnswersData}) {
  const [questionCardData, setQuestionCardData] = useState({
    "question_name": '',
    "answer1": '',
    "answer2": '',
    "answer3": '',
    "answer4": '',
    "correct": '1',
  });


  useEffect(() => {
    getQuestionAnswersData(order, questionCardData);
  }, [questionCardData]);

  let status = `question${order}`;

  const questionCardDataChangeHandler = (event) => {
    if (event.target.name === status) {
      setQuestionCardData(prev => ({ ...prev, 'correct': event.target.value }))
    } else {
      const { name, value } = event.target;
      setQuestionCardData(prev => ({ ...prev, [name]: value }));
    }
  }

  return (
    <form className={styles['question-block']}>
      <div className={styles["question-wrapper"]}>
        <label>Вопрос № {order}</label>
        <textarea className={styles['question-field']} name="question_name" value={questionCardData['question_name']} placeholder="Введите вопрос" onChange={questionCardDataChangeHandler}></textarea>
      </div>
      <div className={styles["answers-wrapper"]}>
        <div className={styles['answer-wrapper']}>
          <span>1.</span>
          <input className={styles['answer-field']} value={questionCardData.answer1} name="answer1" type="text" onChange={questionCardDataChangeHandler} />
          <input onChange={questionCardDataChangeHandler} type='radio' name={status} value="1" checked={questionCardData.correct === "1"} />
        </div>
        <div className={styles['answer-wrapper']}>
          <span>2.</span>
          <input className={styles['answer-field']} value={questionCardData.answer2} name="answer2" type="text" onChange={questionCardDataChangeHandler} />
          <input onChange={questionCardDataChangeHandler} type='radio' name={status} value="2" checked={questionCardData.correct === "2"} />
        </div>
        <div className={styles['answer-wrapper']}>
          <span>3.</span>
          <input className={styles['answer-field']} value={questionCardData.answer3} name="answer3" type="text" onChange={questionCardDataChangeHandler} />
          <input onChange={questionCardDataChangeHandler} type='radio' name={status} value="3" checked={questionCardData.correct === "3"} />
        </div>
        <div className={styles['answer-wrapper']}>
          <span>4.</span>
          <input className={styles['answer-field']} value={questionCardData.answer4} name="answer4" type="text" onChange={questionCardDataChangeHandler} />
          <input onChange={questionCardDataChangeHandler} type='radio' name={status} value="4" checked={questionCardData.correct === "4"} />
        </div>
      </div>
    </form>
  )
}