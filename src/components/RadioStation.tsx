import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext";
import Thumbnail from "./ui snippets/Thumbnail";
import { FaEllipsisVertical } from "react-icons/fa6";
import { Card } from "./ui/card";
import AnimatedWave from "./ui snippets/AnimatedWave";

interface RadioStationProps {
    station: Station;
    favIcon?: boolean;
}

export const RadioStation: React.FC<RadioStationProps> = ({ station, favIcon = false }) => {
    const { currentStation, isPlaying, playStation, toggleFavorite, favorites, pauseStation } = useRadioContext();

    // Check if this station is currently playing
    const isCurrentStationPlaying = currentStation?.stationuuid === station.stationuuid && isPlaying;

    // Check if this station is a favorite
    const isFavorite = favorites.some((fav) => fav.stationuuid === station.stationuuid);

    const handlePlayPause = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest(".controls-area")) {
            return;
        }
        if (isCurrentStationPlaying) {
            pauseStation(); // Pause the station if it's playing
        } else {
            playStation(station); // Play the station if it's not playing or a different station
        }
    };

    return (
        <Card
            className="flex items-center justify-between p-2 cursor-pointer select-none hover:bg-muted rounded-lg"
            onClick={handlePlayPause}
            title={station.name}
        >
            <div className="flex items-center gap-2">
                <div className="relative">
                    <div className="sm:hidden block">
                        <Thumbnail size="40" imgSrc={station.favicon} />
                    </div>
                    <div className="sm:block hidden">
                        <Thumbnail size="56" imgSrc={station.favicon} />
                    </div>
                </div>
                <div className="text-sm pr-2">
                    <div className="font-semibold leading-4 sm:break-words break-all max-w-lg line-clamp-1 text-foreground">
                        {station.name}
                    </div>
                    <div className="line-clamp-1 text-muted-foreground">
                        {station.country}
                        {station.country && station.state ? ", " : ""}
                        {station.state ?? station.state}
                    </div>
                </div>
            </div>
            <div className="flex controls-area items-center">
                {isCurrentStationPlaying ? <AnimatedWave /> : ""}

                {/* Button to toggle favorite */}
                {favIcon ? (
                    <Button
                        onClick={() => toggleFavorite(station)}
                        variant="ghost"
                        className={isFavorite ? "text-secondary" : ""}
                    >
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                ) : (
                    ""
                )}

                <Button variant="ghost" className="px-2 rounded-full">
                    <FaEllipsisVertical />
                </Button>
            </div>
        </Card>
    );
};

export default RadioStation;
