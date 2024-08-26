import React from 'react'
import InteractiveExtLink from './InteractiveExtLink';
import InteractiveCorWords from './InteractiveCorWords';
import InteractiveTesting from './InteractiveTesting';
import styles from './Interactives.module.css';

export default function Interactives({timeCode, interactivesArr, click}) {

    let interactiveType = '';
    for (let elem of interactivesArr) {
        if(Math.floor(timeCode) == elem['time_code']) {
            interactiveType = elem['interactive_type'];
        }
    }

    console.log(interactiveType, 'intertype');

    

  return (
    <div className={styles['interactives_wrapper']}>
        {interactiveType == 'externalSourceLink' && <InteractiveExtLink click={click} timeCode={timeCode} interactivesArr={interactivesArr}/>}
        {interactiveType == 'correctWordsChoice' && <InteractiveCorWords click={click} timeCode={timeCode} interactivesArr={interactivesArr}/>}
        {interactiveType == 'testing' && <InteractiveTesting click={click} timeCode={timeCode} interactivesArr={interactivesArr} />}
    </div>
  )
}
