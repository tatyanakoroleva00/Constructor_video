import React from "react";
import styles from '../css/InteractiveExtLink.module.css';

export default function InteractiveExtLink({ click }) {

//counting









    const linkTaskData = {
        "external_source_link_description": "Более подробнее узнать о мире Гарри Поттера можно перейдя по ссылке ниже",
        "external_source_url": "https://harrypotter.fandom.com/ru"
    }
    return (
        <div className={styles.container} >
            <div className={styles['external-link-wrapper']}>
                <p>{linkTaskData["external_source_link_description"]}</p>
                <p><a target="_blank" href={linkTaskData["external_source_url"]}>{linkTaskData["external_source_url"]}</a></p>
                <button className={styles['next-button']} onClick={click}>Продолжить</button>
            </div>
        </div>

    )

}