import React from "react";
// import { Heart } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext";
import Thumbnail from "./ui snippets/Thumbnail";
import { Card } from "./ui/card";
import AnimatedWave from "./ui snippets/AnimatedWave";

interface RadioStationGridItemProps {
    station: Station;
}

export const RadioStationGridItem: React.FC<RadioStationGridItemProps> = ({ station }) => {
    const { currentStation, isPlaying, playStation, pauseStation } = useRadioContext();

    const isCurrentStationPlaying = currentStation?.stationuuid === station.stationuuid && isPlaying;

    // const isFavorite = favorites.some((fav) => fav.stationuuid === station.stationuuid);

    const handlePlayPause = (e: React.MouseEvent) => {
        if ((e.target as HTMLElement).closest(".controls-area")) {
            return;
        }
        if (isCurrentStationPlaying) {
            pauseStation();
        } else {
            playStation(station);
        }
    };

    return (
        <Card
            className="flex items-start justify-center cursor-pointer select-none sm:active:bg-background active:bg-muted active:rounded-lg sm:rounded-lg rounded-none gap-4 bg-background border-0 sm:w-[196px] w-44 sm:snap-start snap-none sm:p-0 p-2 group"
            onClick={handlePlayPause}
            title={station.name}
        >
            <div className="flex items-center gap-3 flex-col relative">
                <div className="relative">
                    <div className="sm:hidden block">
                        <Thumbnail size="160" imgSrc={station.favicon} stationName={station.name} />
                    </div>
                    <div className="sm:block hidden group-hover:opacity-80">
                        <Thumbnail size="192" imgSrc={station.favicon} stationName={station.name} />
                    </div>
                    <div className="top-0 absolute bg-muted py-1 rounded-br-md rounded-tl-md">
                        {isCurrentStationPlaying ? <AnimatedWave /> : ""}
                    </div>
                </div>
                <div className="flex items-center justify-between w-full">
                    <div className="text-sm space-y-1">
                        <div className="font-semibold sm:break-words break-words max-w-lg line-clamp-2 text-foreground leading-tight">
                            {station.name}
                        </div>
                        <div className="line-clamp-2 text-muted-foreground text-xs" title={station.country}>
                            {station.countrycode}
                            {station.country && station.state ? ", " : ""}
                            {station.state ?? station.state}
                        </div>
                    </div>
                    <div className="flex controls-area items-center">
                        {/* Button to toggle favorite */}
                        {/* {favIcon ? (
                            <Button
                                onClick={() => toggleFavorite(station)}
                                variant="ghost"
                                className="text-secondary pr-2"
                                size="oo"
                            >
                                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                            </Button>
                        ) : (
                            ""
                        )} */}
                    </div>
                </div>
            </div>
        </Card>
    );
};

export default RadioStationGridItem;
