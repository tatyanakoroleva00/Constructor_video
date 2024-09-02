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
  const [iFrame, setIFrame] = useState('');
  const [iFrameIsShown, setIFrameIsShown] = useState(false);

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
    setSwitchStates(true);
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

  const showIFrameHandler = (videoCourseId) => {
    setIFrameIsShown(true);
    // setIFrame('<iframe src="http://videoCourseOnServer/' + videoCourseId + ' width="1200" height="800px"></iframe>');

    const link = new URL('http://videoCourseOnServer/');
    link.searchParams.set('courseId', videoCourseId);
    setIFrame(`<iframe src="${link.toString()}" width="1200" height="800"></iframe>`);

    fetch('http://quiz.site/edit-videocourse-handler', {
      method: 'POST',
      body: JSON.stringify(Math.floor(videoCourseId))
    })
    .then(response => response.json())
      .then(data => {
        console.log(data, 'id is sent');})
  };
  return (
    <div>
       {iFrameIsShown && <div className={styles['iframe-link-modal-window']}>
          <textarea value={iFrame}/>
          <button onClick={()=> setIFrameIsShown(false)} className={styles['close-btn-iframe']}><span>X</span></button>
        </div>}
       <p className={styles.title}>КОНСТРУКТОР</p>
      
       {courses.length !== 0 && <div className={styles['courses-table']}>
          <>
          {courses.map((elem, index) => (
            <div key={index} className={styles['table-line']}>
              <span>{elem['video_course_name']}</span>
              <div className={styles['btns-row']}>
                <button className={styles['edit-btn']} onClick={(event) => editInteractiveHandler(event, elem['video_course_id'])}>Edit</button>
                <button className={styles['delete-btn']} onClick={(event) => deleteInteractiveHandler(event, elem['video_course_id'])}>Delete</button>
                <button className={styles['play-btn']} onClick={() => showVideoCourseHandler(elem['video_course_id'])}>Preview</button>
                <button className={styles['iframe-btn']} onClick={() => showIFrameHandler(elem['video_course_id'])}>Iframe</button>
              </div>
            </div>
          ))}
          </>
        </div>}
      <div className={styles['add-new-project-wrapper']}>
        <button onClick={() => setNewCourse(true)}>Добавить проект</button>
      </div>
      {newCourse && (
        <form className={styles['form-wrapper']} onSubmit={submitFormHandler}>
          <div className={styles['form-fields']}>
          <label>Заголовок&nbsp;</label>
          <input
            type="text"
            name="heading"
            value={stateOneData.heading}
            onChange={inputChangeHandler}
            required
          />
          </div>
          <div className={styles['form-fields']}>
          <label>URL видео&nbsp;</label>
          <input
            type="text"
            name="url"
            value={stateOneData.url}
            onChange={inputChangeHandler}
            required
          />
          </div>
          <input className={styles['submit-btn']}  type="submit" value="Создать курс"/>
        </form>
      )}
    </div>
  );
};

export default StateOne;
