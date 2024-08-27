import React from "react";
import styles from './css/StateOne.module.css';
import { useState, useEffect } from "react";
const StateOne = ({ setSwitchStates, setGlobalData, setServerData, setServerDataGot, setVideoData, setInteractivesArr, setPlayBtnIsClicked }) => {
  const [newCourse, setNewCourse] = useState(false);
  const [stateOneData, setStateOneData] = useState({
    heading: "",
    url: "",
  });
  const [courses, setCourses] = useState([]); 

    //Подгрузка лишь вначале всех данных
    useEffect(() => {
      fetch('http://quiz.site/get-all-video-courses-handler')
        .then(response => response.json())
        .then((data) => {
          setCourses(data);
        })
    }, [])
  

  const inputChangeHandler = (event) => {
    const { name, value } = event.target;
    setStateOneData((prev) => ({ ...prev, [name]: value }));
  };
  const submitFormHandler = (event) => {
    event.preventDefault();
    setGlobalData({'heading' : stateOneData['heading'], 'url' : stateOneData['url']});
  }

  const deleteInteractiveHandler = (event, courseId) => {
    event.preventDefault();

    fetch('http://quiz.site/delete-videocourse-handler', {   //Делаем запрос на сервер. Ищем по айди курс, который нужно удалить. 
      method: 'POST',
      body: JSON.stringify(courseId)
    })

    window.location.reload();
  }

  const editInteractiveHandler = (event, courseIdGot) => { //Редактируем курс
    event.preventDefault();

    fetch('http://quiz.site/edit-videocourse-handler', {
      method: 'POST',
      body: JSON.stringify(courseIdGot)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, 'to edit');
        setSwitchStates(true);
        data['id'] = courseIdGot;
        // getData(data); //получаем данные по курсу с сервера
        setServerData(data); //задаем Сервеные данные
        setServerDataGot(true);
        setGlobalData(data);
      })
  }

  const showVideoCourseHandler = (videoCourseId) => {
    fetch('http://quiz.site/edit-videocourse-handler', {
      method: 'POST',
      body: JSON.stringify(Math.floor(videoCourseId))
  })
      .then(response => response.json())
      .then(data => {
          // console.log(data, 'data');
          setVideoData(data);
          setInteractivesArr(data.interactives);
          setPlayBtnIsClicked(true);
      })
  }
  return (
    <div>
       <p>КОНСТРУКТОР</p>
      
       {courses.length !== 0 && <div className={styles['courses-table']}>
          <>
          {courses.map((elem, index) => (
            <div key={index} className={styles['table-line']}>
              <span>{elem['video_course_name']}</span>
              <div>
                <button onClick={(event) => editInteractiveHandler(event, elem['video_course_id'])}>Edit</button>
                <button onClick={(event) => deleteInteractiveHandler(event, elem['video_course_id'])}>Delete</button>
                <button onClick={() => showVideoCourseHandler(elem['video_course_id'])}>Play</button>
              </div>
            </div>
          ))}
          </>
        </div>}


      <div>
        <button onClick={() => setNewCourse(true)}>Добавить проект</button>
      </div>
      {newCourse && (
        <form onSubmit={submitFormHandler}>
          <label>Заголовок&nbsp;</label>
          <input
            type="text"
            name="heading"
            value={stateOneData.heading}
            onChange={inputChangeHandler}
          />
          <label>URL видео&nbsp;</label>
          <input
            type="text"
            name="url"
            value={stateOneData.url}
            onChange={inputChangeHandler}
          />
          <button onClick={() => setSwitchStates(true)}>Create a Course</button>
        </form>
      )}
    </div>
  );
};

export default StateOne;
