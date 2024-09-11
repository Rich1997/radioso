import React from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext";
import Thumbnail from "./ui snippets/Thumbnail";
import { FaEllipsisVertical } from "react-icons/fa6";

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
        <div
            className="flex items-center justify-between p-2 cursor-pointer select-none hover:bg-muted hover:text-muted-foreground rounded-lg"
            onClick={handlePlayPause}
        >
            <div className="flex items-center gap-2">
                <div className="relative">
                    <div className="sm:hidden block">
                        <Thumbnail size="40" imgSrc={station.favicon} />
                    </div>
                    <div className="sm:block hidden">
                        <Thumbnail size="56" imgSrc={station.favicon} />
                    </div>
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
                    <div className="line-clamp-1">
                        {station.country}
                        {station.country && station.state ? ", " : ""}
                        {station.state ?? station.state}
                    </div>
                </div>
            </div>
            <div className="flex controls-area">
                {/* Button to toggle favorite */}
                {favIcon ? (
                    <Button
                        onClick={() => toggleFavorite(station)}
                        variant="ghost"
                        className={isFavorite ? "text-red-400 hover:text-red-500" : "hover:text-red-500"}
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
        </div>
    );
};

export default RadioStation;
