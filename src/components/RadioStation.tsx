import React from "react";
import { Heart } from "lucide-react";
import { FaPlay, FaStop } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext"; // Import context

interface RadioStationProps {
    station: Station;
    playIcon?: React.ReactNode;
}

export const RadioStation: React.FC<RadioStationProps> = ({ station, playIcon }) => {
    const { currentStation, isPlaying, playStation, toggleFavorite, favorites, pauseStation } = useRadioContext(); // Use context

    // Check if this station is currently playing
    const isCurrentStationPlaying = currentStation?.stationuuid === station.stationuuid && isPlaying;

    // Check if this station is a favorite
    const isFavorite = favorites.some((fav) => fav.stationuuid === station.stationuuid);

    const handlePlayPause = () => {
        if (isCurrentStationPlaying) {
            pauseStation(); // Pause the station if it's playing
        } else {
            playStation(station); // Play the station if it's not playing or a different station
        }
    };

    return (
        <div className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
                <img src={station.favicon} alt={station.name} className="w-10 h-10 mr-2" />
                <span>{station.name}</span>
            </div>
            <div className="flex space-x-2">
                {/* Button to toggle play/stop */}
                <Button onClick={handlePlayPause} variant="outline">
                    {/* Use playIcon if passed, otherwise default to FaPlay/FaStop */}
                    {playIcon ? playIcon : isCurrentStationPlaying ? <FaStop /> : <FaPlay />}
                </Button>

                {/* Button to toggle favorite */}
                <Button
                    onClick={() => toggleFavorite(station)}
                    variant="outline"
                    className={isFavorite ? "text-red-500" : ""}
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
            </div>
        </div>
    );
};

export default RadioStation;
