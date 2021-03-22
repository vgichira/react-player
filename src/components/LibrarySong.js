import React from "react";
import { playAudio } from "../util"

const LibrarySong = ({ song, setCurrentSong, setIsPlaying, setSongs, isPlaying, audioRef, id, songs}) => {
    const songSelectorHandler = () => {
        setCurrentSong(song)

        const newSongs = songs.map(song => {
            if(song.id === id){
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
        
        playAudio(isPlaying, audioRef)
    }

    return (
        <div onClick={songSelectorHandler} className={`library-song ${song.active ? "selected" : ""}`}>
            <img alt="Song Cover" src={song.cover} />
            <div className="song-description">
                <h3>{song.name}</h3>
                <h4>{song.artist}</h4>
            </div>
        </div>
    );
};

export default LibrarySong;