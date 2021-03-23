import React from "react";

const LibrarySong = ({ song, setCurrentSong, setIsPlaying, setSongs, isPlaying, audioRef, id, songs}) => {
    const songSelectorHandler = async () => {
        await setCurrentSong(song)

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

        if (isPlaying) audioRef.current.play()
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