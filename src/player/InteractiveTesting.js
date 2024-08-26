import { useState } from 'react';
import './interactive_testing.css';

export default function InteractiveTesting ({click}) {

    const quiz = {
        topic: 'Гарри Поттер',
        level: 'Beginner',
        totalQuestions: 4,
        perQuestionScore: 5,
        questions: [
          {
            question: 'Кто из этих персонажей не дружит с Гарри Поттером?',
            choices: ['Рон Уизли', 'Невилл Лонгботтом', 'Драко Малфой', 'Гермиона Грейнджер'],
            correctAnswer: 'Драко Малфой',
          },
          {
            question: 'Какое животное было у Гарри Поттера?',
            choices: ['Крыса', 'Сова', 'Не было', 'Кролик'],
            correctAnswer: 'Сова',
          },
          {
            question: 'Какой преподаватель ненавидел Гарри Поттера?',
            choices: ['Дамблдор', 'Снейп', 'Макгонагал', 'Его любили все'],
            correctAnswer: 'Снейп',
          },
          {
            question: 'Где Гарри и его друзья любили выпить сливочное пиво?',
            choices: ['Деревня Хогсмид', 'У Хагрида', 'В замке', 'В гостиной Слизерин'],
            correctAnswer: 'Деревня Хогсмид',
          },
        ],
      }

  const [activeQuestion, setActiveQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showResult, setShowResult] = useState(false)
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null)
  const [result, setResult] = useState({
    score: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
  })

  const { questions } = quiz
  const { question, choices, correctAnswer } = questions[activeQuestion]

  
  const onClickNext = () => {
    setSelectedAnswerIndex(null)
    setResult((prev) =>
      selectedAnswer
        ? {
            ...prev,
            score: prev.score + 5,
            correctAnswers: prev.correctAnswers + 1,
          }
        : { ...prev, wrongAnswers: prev.wrongAnswers + 1 }
    )
    if (activeQuestion !== questions.length - 1) {
      setActiveQuestion((prev) => prev + 1)
    } else {
      setActiveQuestion(0)
      setShowResult(true)
    }
  }

  const onAnswerSelected = (answer, index) => {
    setSelectedAnswerIndex(index)
    if (answer === correctAnswer) {
      setSelectedAnswer(true)
    } else {
      setSelectedAnswer(false)
    }
  }

  const addLeadingZero = (number) => (number > 9 ? number : `0${number}`)

  return (
    <div className="quiz-container">
      {!showResult ? (
        <div>
          <div>
            <span className="active-question-no">{addLeadingZero(activeQuestion + 1)}</span>
            <span className="total-question">/{addLeadingZero(questions.length)}</span>
          </div>
          <h2>{question}</h2>
          <ul>
            {choices.map((answer, index) => (
              <li
                onClick={() => onAnswerSelected(answer, index)}
                key={answer}
                className={selectedAnswerIndex === index ? 'selected-answer' : null}>
                {answer}
              </li>
            ))}
          </ul>
          <div className="flex-right">
            <button onClick={onClickNext} disabled={selectedAnswerIndex === null}>
              {activeQuestion === questions.length - 1 ? 'Завершить' : 'Далее'}
            </button>
          </div>
        </div>
      ) : (
        <div className="result">
          <h3>Результат</h3>
          <p>
            Количество вопросов: <span>{questions.length}</span>
          </p>
          <p>
            Итог:<span> {result.score}</span>
          </p>
          <p>
            Правильные ответы:<span> {result.correctAnswers}</span>
          </p>
          <p>
            Неправильные ответы:<span> {result.wrongAnswers}</span>
          </p>
          <button onClick={click}>Продолжить</button>
        </div>
      )}
    </div>
  )
}
