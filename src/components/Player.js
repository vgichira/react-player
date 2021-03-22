import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faPlay,
    faPause,
    faAngleRight,
    faAngleLeft,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({ currentSong: { audio }, isPlaying, setIsPlaying, audioRef, songInfo, setSongInfo }) => {
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
                />
            </div>
            <audio
                onTimeUpdate={timeUpdateHandler}
                onLoadedMetadata={timeUpdateHandler}
                ref={audioRef}
                src={audio}
            ></audio>
        </div>
    );
};

export default Player;
