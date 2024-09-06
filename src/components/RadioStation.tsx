import React from "react";
import { Heart } from "lucide-react";
import { FaPlay, FaStop } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";

interface RadioStationProps {
    station: Station;
    isPlaying: boolean;
    isFavorite: boolean;
    onTogglePlay: () => void;
    onToggleFavorite: () => void;
    playIcon?: React.ReactNode;
}

export const RadioStation: React.FC<RadioStationProps> = ({
    station,
    isPlaying,
    isFavorite,
    onTogglePlay,
    onToggleFavorite,
    playIcon,
}) => {
    return (
        <div className="flex items-center justify-between p-2 border rounded">
            <div className="flex items-center">
                <img src={station.favicon} alt={station.name} className="w-10 h-10 mr-2" />
                <span>{station.name}</span>
            </div>
            <div className="flex space-x-2">
                {/* Button to toggle play/stop */}
                <Button onClick={onTogglePlay} variant="outline">
                    {/* Use playIcon if passed, otherwise default to FaPlay/FaStop */}
                    {playIcon ? playIcon : isPlaying ? <FaStop /> : <FaPlay />}
                </Button>

                {/* Button to toggle favorite */}
                <Button onClick={onToggleFavorite} variant="outline" className={isFavorite ? "text-red-500" : ""}>
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
            </div>
        </div>
    );
};

export default RadioStation;
