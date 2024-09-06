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
        return <div className="text-center py-4">No station currently playing</div>;
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying); // Toggle play/pause state
    };

    return (
        <div className="text-muted-foreground h-full">
            <AudioPlayer
                audioUrl={currentStation.url}
                thumb={currentStation.favicon} // Assuming the station has a favicon
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
            />
        </div>
    );
};

export default NowPlaying;
