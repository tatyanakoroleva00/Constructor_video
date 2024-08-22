import React from "react";
import { useState, useEffect } from "react";
import styles from '../css/CorrectWordsChoice.module.css';
import Word from "./Word";

export default function CorrectWordsChoice ({getData, sentBtn}) {
  const [data, setData] = useState({});
  const [wordsArr, setWordsArr] = useState([]);

  const changeHandler = (event) => { //Меняем инфу в инпуте
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    getData(data);
  }, [data]);


 const addWordHandler = () => {
  setWordsArr((prev) => [...prev, 1]);
 };

 const deleteWordHandler = () => {
    let lastWordKey = wordsArr.length; //Удаляем последний введенный вопрос с ответами из массива данных
    let lastWord = 'word' + lastWordKey;
    delete data[lastWord];

    setWordsArr(wordsArr.slice(0, -1));
  }


 const wordsDataHandler = (order, wordLine) => {
  let word = `word${order}`;
  setData(prev => ({...prev, [word] : wordLine}));
};
  return (
    <div className={styles["correct-words-form"]}>
      <section className={styles["task-wrapper"]}>
        <p>Задание: </p>
        <textarea
          placeholder="Введите задание"
          name="task"
          // value={data.task}
          rows={5}
          onChange={changeHandler}
        ></textarea>
      </section>


      <section className={styles["words-wrapper"]}>
        <p>Слова: </p>
        <div className={styles["words-field"]}>
          {wordsArr.map((word, index) => (
          <div key={word + index}>
            <Word wordIndex={index} order={index + 1} getWordData={wordsDataHandler} setData={setData} data={data}/>
          </div>
        ))}

        {!sentBtn &&
        <div className={styles.buttons}>
        <button className={styles["add-button"]} onClick={addWordHandler}>Добавить слово</button>
        <button className={styles["remove-button"]} onClick={deleteWordHandler}>Удалить слово</button>
        </div>
        }
        </div>
      </section>

    </div>
  );
};
