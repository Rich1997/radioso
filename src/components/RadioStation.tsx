import React from "react";
import { Heart, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext";
import Thumbnail from "./ui snippets/Thumbnail";
import { Card } from "./ui/card";
import AnimatedWave from "./ui snippets/AnimatedWave";
import { useFavoritesContext } from "@/context/FavoritesContext";

interface RadioStationProps {
    station: Station;
    favIcon?: boolean;
}

export const RadioStation: React.FC<RadioStationProps> = ({ station, favIcon = false }) => {
    const { currentStation, isPlaying, playStation, pauseStation } = useRadioContext();
    const { toggleFavorite, favorites } = useFavoritesContext();

    const isCurrentStationPlaying = currentStation?.stationuuid === station.stationuuid && isPlaying;

    const isFavorite = favorites.some((fav) => fav.stationuuid === station.stationuuid);

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
            className="flex items-center justify-between sm:p-2 px-4 py-2 cursor-pointer select-none sm:hover:bg-muted hover:bg-background active:bg-muted sm:rounded-lg rounded-none gap-4 bg-background sm:border border-0"
            onClick={handlePlayPause}
            title={station.name}
        >
            <div className="flex items-center gap-2">
                <div className="relative">
                    <div className="sm:hidden block">
                        <Thumbnail size="48" imgSrc={station.favicon} stationName={station.name} />
                    </div>
                    <div className="sm:block hidden">
                        <Thumbnail size="56" imgSrc={station.favicon} stationName={station.name} />
                    </div>
                </div>
                <div className="text-sm">
                    <div className="font-semibold sm:break-words break-all max-w-lg line-clamp-1 text-foreground leading-tight">
                        {station.name}
                    </div>
                    <div className="line-clamp-1 text-muted-foreground text-xs">
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
                    <Button onClick={() => toggleFavorite(station)} variant="ghost" className="text-secondary">
                        <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
                    </Button>
                ) : (
                    ""
                )}

                <Button variant="ghost" className="px-0 rounded-full text-muted-foreground">
                    <MoreVertical size={20} />
                </Button>
            </div>
        </Card>
    );
};

export default RadioStation;
