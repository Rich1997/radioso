import React from "react";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext";

type PlayPauseProps = {
    station: Station;
};

const PlayPause: React.FC<PlayPauseProps> = ({ station }) => {
    const { currentStation, isPlaying, playStation, setIsPlaying } = useRadioContext();

    const handlePlayPauseClick = () => {
        if (currentStation?.id === station.id && isPlaying) {
            // If the same station is playing, pause it
            setIsPlaying(false);
        } else {
            // If a different station is selected or paused, play the new station
            playStation(station);
        }
    };

    return (
        <button onClick={handlePlayPauseClick} className="p-2 bg-blue-500 text-white rounded">
            {currentStation?.id === station.id && isPlaying ? "Pause" : "Play"}
        </button>
    );
};

export default PlayPause;
