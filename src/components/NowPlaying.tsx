import React, { useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import { useRadioContext } from "../context/RadioContext";

export const NowPlaying: React.FC = () => {
    const { currentStation, isPlaying, setIsPlaying } = useRadioContext();

    // Automatically play the station when it's changed
    useEffect(() => {
        if (currentStation) {
            setIsPlaying(true); // Auto-play when the station changes
        }
    }, [currentStation, setIsPlaying]);

    if (!currentStation) {
        return (
            <div className="p-4 h-full w-full flex items-center text-center">
                <div className="flex-1">No station currently playing</div>
            </div>
        );
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); // Toggle play/pause state
    };

    return (
        <div className="flex items-center text-muted-foreground h-full p-4">
            <AudioPlayer
                audioUrl={currentStation.url}
                thumb={currentStation.favicon} // Assuming the station has a favicon
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                stationName={currentStation.name}
                stationCountry={currentStation.country}
                stationState={currentStation.state}
            />
        </div>
    );
};

export default NowPlaying;
