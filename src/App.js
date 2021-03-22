import { useState, useRef } from "react";
// Bring in the components
import Song from "./components/Song";
import Player from "./components/Player";
import Library from "./components/Library";
import Nav from "./components/Nav";
import "./styles/app.scss";
// import util
import data from "./util";

function App() {
    const [songs, setSongs] = useState(data());
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState(null);
    const [libraryActive, setLibraryActive] = useState(false);
    const audioRef = useRef(null);

    return (
        <div className="App">
            <Nav 
                libraryActive={libraryActive} 
                setLibraryActive={setLibraryActive}
            />
            <Song 
                currentSong={currentSong} 
            />
            <Player
                currentSong={currentSong}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                audioRef={audioRef}
                songInfo={songInfo}
                setSongInfo={setSongInfo}
            />
            <Library 
                audioRef={audioRef} 
                setSongs={setSongs} 
                setIsPlaying={setIsPlaying} 
                isPlaying={isPlaying} 
                setCurrentSong={setCurrentSong} 
                songs={songs} 
                setSongInfo={setSongInfo}
                songInfo={songInfo}
                libraryActive={libraryActive}
            />
        </div>
    );
}

export default App;