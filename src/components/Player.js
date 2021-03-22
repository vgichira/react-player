import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ 
    currentSong, 
    isPlaying, 
    setIsPlaying, 
    audioRef, 
    songInfo, 
    setSongInfo, 
    songs, 
    setCurrentSong,
}) => {
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const timeUpdateHandler = (event) => {
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;

        setSongInfo({
            currentTime,
            duration,
        });
    };

    const getTime = (time) => {
        return (
            Math.floor(time / 60) +
            ":" +
            ("0" + Math.floor(time % 60)).slice(-2)
        );
    };

    const dragHandler = (event) => {
        audioRef.current.currentTime = event.target.value;
        setSongInfo({ ...songInfo, currentTime: event.target.value });
    };

    const skipHandler = (direction) =>{
        const currentIndex = songs.findIndex(song => song.id === currentSong.id)

        if(direction === "skip-forward"){
            setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        }else if(direction === "skip-back"){
            setCurrentSong(songs[(currentIndex - 1) % songs.length]);

            if (currentIndex === 0){
                setCurrentSong(songs[songs.length - 1]);
            }
        }

        setIsPlaying(isPlaying)

        if(isPlaying){
            const playPromise = audioRef.current.play()

            if(playPromise !== undefined){
                playPromise.then(audio => {
                    audioRef.current.play();
                })
            }
        }
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{songInfo ? getTime(songInfo.currentTime) : 0}</p>
                <input
                    min={0}
                    max={songInfo ? songInfo.duration : 0}
                    value={songInfo ? songInfo.currentTime : 0}
                    type="range"
                    onChange={dragHandler}
                />
                <p>{getTime(songInfo ? songInfo.duration : 0 || 0)}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon
                    className="skip-back"
                    size="2x"
                    icon={faAngleLeft}
                    onClick={() => skipHandler("skip-back")}
                />
                <FontAwesomeIcon
                    onClick={playSongHandler}
                    className="play"
                    size="2x"
                    icon={isPlaying ? faPause : faPlay}
                />
                <FontAwesomeIcon
                    className="skip-forward"
                    size="2x"
                    icon={faAngleRight}
                    onClick={() => skipHandler("skip-forward")}
                />
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={currentSong.audio}
            ></audio>
        </div>
    );
};

export default Player;
