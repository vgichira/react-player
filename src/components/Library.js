import React from 'react';
import LibrarySong from './LibrarySong';

const Library = ({songs, setCurrentSong, setSongs, setIsPlaying, isPlaying, audioRef, setSongInfo, songInfo, libraryActive}) => {
    return(
        <div className={`library ${libraryActive ? "library-active" : ""}`}>
            <h2>Library</h2>
            <div className="library-songs">
                {songs.map(song => <LibrarySong 
                    setIsPlaying={setIsPlaying} 
                    isPlaying={isPlaying} 
                    audioRef={audioRef} 
                    songs={songs} 
                    id={song.id} 
                    key={song.id} 
                    setSongs={setSongs} 
                    setCurrentSong={setCurrentSong} 
                    song={song}
                    setSongInfo={setSongInfo}
                    songInfo={songInfo}
                />)}
            </div>
        </div>
    )
}

export default Library;