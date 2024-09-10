import React from "react";
import { Heart } from "lucide-react";
import { FaPlay, FaStop } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext";
import { Card } from "./ui/card";
import Thumbnail from "./ui snippets/Thumbnail";

interface RadioStationProps {
    station: Station;
    playIcon?: React.ReactNode;
}

export const RadioStation: React.FC<RadioStationProps> = ({ station, playIcon }) => {
    const { currentStation, isPlaying, playStation, toggleFavorite, favorites, pauseStation } = useRadioContext();

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
        <Card className="flex items-center justify-between p-2 cursor-pointer select-none">
            <div className="flex items-center gap-2">
                <div className="relative">
                    <Thumbnail size="40" imgSrc={station.favicon} />
                    {isCurrentStationPlaying ? (
                        <div className="flex absolute top-0">
                            <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></div>
                            <div className="relative rounded-full h-3 w-3 bg-success ring-2 ring-white"></div>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
                <div className="text-sm text-muted-foreground pr-2">
                    <div className="font-semibold leading-4 sm:break-words break-all max-w-lg line-clamp-1">
                        {station.name}
                    </div>
                    {station.country}
                    {station.country && station.state ? ", " : ""}
                    {station.state ?? station.state}
                </div>
            </div>
            <div className="flex gap-2">
                {/* Button to toggle play/stop */}
                <Button onClick={handlePlayPause} variant="outline">
                    {/* Use playIcon if passed, otherwise default to FaPlay/FaStop */}
                    {playIcon ? playIcon : isCurrentStationPlaying ? <FaStop /> : <FaPlay />}
                </Button>

                {/* Button to toggle favorite */}
                <Button
                    onClick={() => toggleFavorite(station)}
                    variant="ghost"
                    className={isFavorite ? "text-primary" : ""}
                >
                    <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                </Button>
            </div>
        </Card>
    );
};

export default RadioStation;
