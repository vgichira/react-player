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
    setSongs
}) => {
    const activeLibraryHandler = (nextPrev) => {
        const newSongs = songs.map(song => {
            if(song.id === nextPrev.id){
                return {
                    ...song,
                    active: true,
                }
            }else{
                return {
                    ...song, 
                    active: false,
                }
            }
        })

        setSongs(newSongs)
    }

    // Event Handlers
    const playSongHandler = () => {
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const timeUpdateHandler = (event) => {
        const currentTime = event.target.currentTime;
        const duration = event.target.duration;

        const roundedCurrent = Math.round(currentTime)
        const roundedDuration = Math.round(duration)
        const animationPercentage = Math.round((roundedCurrent / roundedDuration) * 100)

        setSongInfo({
            currentTime,
            duration,
            animationPercentage
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

    const skipHandler = async (direction) =>{
        const currentIndex = songs.findIndex(song => song.id === currentSong.id)

        if(direction === "skip-forward"){
            await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

            activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }else if(direction === "skip-back"){
            if (((currentIndex - 1) % songs.length) === -1){
                await setCurrentSong(songs[songs.length - 1]);

                activeLibraryHandler(songs[songs.length - 1]);
            }else{
                await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
                
                activeLibraryHandler(songs[(currentIndex - 1) % songs.length])
            }
        }

        setIsPlaying(isPlaying);

        if (isPlaying) audioRef.current.play();
    }

    const songEndedHandler = async () =>{
        const currentIndex = songs.findIndex(song => song.id === currentSong.id);

        await setCurrentSong(songs[(currentIndex + 1) % songs.length]);

        setIsPlaying(isPlaying);

        if (isPlaying) audioRef.current.play();
    }

    // Add the styles
    const trackAnim = {
        transform: `translateX(${songInfo.animationPercentage}%)`
    }

    return (
        <div className="player">
            <div className="time-control">
                <p>{songInfo ? getTime(songInfo.currentTime) : 0}</p>
                <div style={{background: `linear-gradient(to right, ${currentSong.color[0]}, ${currentSong.color[1]})`}} className="track">
                    <input
                        min={0}
                        max={songInfo ? songInfo.duration : 0}
                        value={songInfo ? songInfo.currentTime : 0}
                        type="range"
                        onChange={dragHandler}
                    />

                    <div style={trackAnim} className="animate-track"></div>
                </div>
                <p>{songInfo ? getTime(songInfo.duration) : "0:00"}</p>
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
                onEnded={songEndedHandler}
            ></audio>
        </div>
    );
};

export default Player;