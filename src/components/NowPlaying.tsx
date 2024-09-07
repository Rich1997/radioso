import React, { useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import { useRadioContext } from "../context/RadioContext";
import PaddedContainer from "./ui snippets/PaddedContainer";

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
            <div className="flex items-center py-4 h-full">
                <PaddedContainer padding="4">No station currently playing</PaddedContainer>
            </div>
        );
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); // Toggle play/pause state
    };

    return (
        <div className="flex items-center text-muted-foreground h-full px-4">
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
