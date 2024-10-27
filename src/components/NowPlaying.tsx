import React, { useEffect } from "react";
import AudioPlayer from "./AudioPlayer";
import { useRadioContext } from "../context/RadioContext";
import AudioPlayerSkeleton from "./AudioPlayerSkeleton";

export const NowPlaying: React.FC = () => {
    const { currentStation, isPlaying, setIsPlaying } = useRadioContext();

    // Automatically play the station when it's changed
    useEffect(() => {
        if (currentStation) {
            setIsPlaying(true); // Auto-play when the station changes
        }
    }, [currentStation, setIsPlaying]);

    if (!currentStation) {
        return <AudioPlayerSkeleton />;
    }

    const handlePlayPause = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="flex items-center text-muted-foreground h-full sm:px-6 sm:py-3 px-4 p-4">
            <AudioPlayer
                audioUrl={currentStation.url}
                thumb={currentStation.favicon}
                isPlaying={isPlaying}
                onPlayPause={handlePlayPause}
                stationName={currentStation.name}
                stationCountry={currentStation.countrycode}
                stationState={currentStation.state}
                stationHomepage={currentStation.homepage}
            />
        </div>
    );
};

export default NowPlaying;
