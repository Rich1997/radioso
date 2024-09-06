import React from "react";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { FaPlay, FaStop } from "react-icons/fa"; // Import Play and Stop icons
import { useRadioContext } from "../context/RadioContext";
import RadioStation from "./RadioStation";

export const NowPlaying: React.FC = () => {
    const { currentStation, isPlaying, setIsPlaying, toggleFavorite, favorites } = useRadioContext();

    if (!currentStation) {
        return <div className="text-center py-4">No station currently playing</div>;
    }

    return (
        <div className="bg-gray-100 p-4">
            <RadioStation
                station={currentStation}
                isPlaying={isPlaying}
                isFavorite={favorites.some((fav) => fav.id === currentStation.id)}
                onTogglePlay={() => setIsPlaying(!isPlaying)}
                onToggleFavorite={() => toggleFavorite(currentStation)}
                playIcon={isPlaying ? <FaStop /> : <FaPlay />} // Show Stop icon if playing, else Play
            />
            <AudioPlayer
                autoPlay
                src={currentStation.url}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                showJumpControls={false}
                customControlsSection={["MAIN_CONTROLS"]}
            />
        </div>
    );
};

export default NowPlaying;
