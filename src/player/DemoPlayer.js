import InteractiveExtLink from './InteractiveExtLink.js';
import InteractiveQuiz from './InteractiveQuiz.js';
import InteractiveCorWords from './InteractiveCorWords.js';
import HP from '../video/HP.mp4';
import styles from '../css/DemoPlayer.module.css'
import play_button from '../images/play-btn.png';
import pause_button from '../images/pause-btn.png';
import "react-video-seek-slider/styles.css";
import { VideoSeekSlider } from "react-video-seek-slider";
import { useCallback, useEffect, useRef, useState } from "react";

export default function DemoPlayer() {
    const player = useRef(null);
    const interval = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [maxTime, setMaxTime] = useState(0);
    const [interactive1, setInteractive1] = useState(false);
    const [interactive2, setInteractive2] = useState(false);
    const [interactive3, setInteractive3] = useState(false);
    const [videoswitch, setVideoSwitch] = useState(true);

    //Slider 

    const handleTimeChange = useCallback((time, offsetTime) => {
        if (!player.current?.currentTime) {
            return;
        }

        player.current.currentTime = time / 1000;
        setCurrentTime(time);
    }, []);

    const handlePlay = () => {
        interval.current = setInterval(() => {
            setCurrentTime((player.current?.currentTime || 0) * 1000);
        }, 1000);
    };

    const handlePause = () => {
        clearInterval(interval.current);
    };

    const handleDataLoaded = () => {
        setMaxTime((player.current?.duration || 0) * 1000);
    };

    const handleProgress = () => {
        const buffer = player?.current?.buffered;

        if (((buffer?.length > 0 && player.current?.duration) || 0) > 0) {
            let currentBuffer = 0;
            const inSeconds = player.current?.currentTime || 0;

            for (let i = 0; i < buffer.length; i++) {
                if (buffer.start(i) <= inSeconds && inSeconds <= buffer.end(i)) {
                    currentBuffer = i;
                    break;
                }
            }

            setProgress(buffer.end(currentBuffer) * 1000 || 0);
        }
    };

    

    useEffect(() => {
        if (!player) {
            return;
        } else {
        player.current?.addEventListener("play", handlePlay);
        player.current?.addEventListener("pause", handlePause);
        player.current?.addEventListener("loadeddata", handleDataLoaded);
        player.current?.addEventListener("progress", handleProgress);
        }
    }, [player]);

    //Episodes

    const [episodes, setEpisodes] = useState({
        interactive1: 3,
        interactive2: 25,
        interactive3: 50,
    });

    let chaptersArr = [];
    for (let key in episodes) {
        chaptersArr.push(key);
    }

    useEffect(() => {
        for (let key in episodes) {

            let time = Math.floor(currentTime / 1000);
            if (time == 3) {
                setInteractive1(true);
                player.current.pause();
            }
            if (time == 25) {
                setInteractive2(true);
                player.current.pause();
            }
            if (time == 50) {
                setInteractive3(true);
                player.current.pause();
            }
        }

    }, [player, currentTime])

    /* Что происходит, когда нажимаем на включить и выключить видео */
    const handlePlayPauseClick = () => {

        setInteractive1(false);
        setInteractive2(false);
        setInteractive3(false);

        setVideoSwitch(!videoswitch);
        if (videoswitch) {
            player.current.play();
        } else {
            player.current.pause();
        }
    }
    /* Интерактив показываем по нажатию на точку */
const showInteractive = (event, id) => {
    if (id == 1) {
        setInteractive1(true);
        player.current.pause();
        // setCurrentTime(30000);
        
    }
    if (id == 2) {
        setInteractive2(true);
        player.current.pause();
        
    }
    if (id == 3) {
        setInteractive3(true);
        player.current.pause();
    }
}


/* Рассчет размещения точек для интерактивов на видео */
let seconds = maxTime / 1000;
let pixelsPerSecond=  630 / seconds;


    return (
        <div className={styles.container}>

            <div className={styles.visible}>
                    <video
                    autoPlay={false}
                    className={styles['video-preview']}
                    ref={player}>
                    <source
                        src={HP}
                        type="video/mp4"
                    />
                </video>
            </div>
            {interactive1 && <InteractiveQuiz click={handlePlayPauseClick} />}
            {interactive2 && <InteractiveExtLink click={handlePlayPauseClick} />}
            {interactive3 && <InteractiveCorWords click={handlePlayPauseClick} />}

            <div className={styles['toolbar-wrapper']}>
                <div className={styles['dynamic-btn']}>
                <button onClick={handlePlayPauseClick}>
                    {videoswitch ? <img className={styles['play-btn']} src={play_button} alt="play_button" /> :
                        <img className={styles['pause-btn']} src={pause_button} alt='pause_button' />}
                </button>
                </div>
                <div className={styles['slider-wrapper']}> 
                
                    <VideoSeekSlider
                        max={maxTime}
                        currentTime={currentTime}
                        bufferTime={progress}
                        onChange={handleTimeChange}
                        limitTimeTooltipBySides={true}
                        secondsPrefix="00:"
                        minutesPrefix="0:"
                        hideHoverTime={false}
                    />
                    <div className={styles['interactives-line']}>
                        <div id="1" onClick={(event) => {showInteractive(event, event.target.id)}} style={{left: Math.floor(episodes['interactive1'] * pixelsPerSecond)}} className={styles.first}></div>
                        <div id="2" onClick={(event) => {showInteractive(event, event.target.id)}} style={{left: Math.floor(episodes['interactive2'] * pixelsPerSecond)}} className={styles.second} ></div>
                        <div id="3" onClick={(event) => {showInteractive(event, event.target.id)}} style={{left: Math.floor(episodes['interactive3'] * pixelsPerSecond)}} className={styles.third}></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

