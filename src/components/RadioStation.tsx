import React from "react";
import { Heart, MoreVertical, MousePointer2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Station } from "../utils/types";
import { useRadioContext } from "../context/RadioContext";
import Thumbnail from "./ui snippets/Thumbnail";
import { Card } from "./ui/card";
import AnimatedWave from "./ui snippets/AnimatedWave";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { getCountryName } from "@/lib/utils";

interface RadioStationProps {
    station: Station;
    favIcon?: boolean;
    showClickCount?: boolean;
    showBitrate?: boolean;
}

export const RadioStation: React.FC<RadioStationProps> = ({
    station,
    favIcon = false,
    showClickCount = false,
    showBitrate = false,
}) => {
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

    const country = getCountryName(station.countrycode);

    return (
        <Card
            className="flex items-center justify-between sm:p-2 px-4 py-2 cursor-pointer select-none sm:hover:bg-muted hover:bg-background active:bg-muted sm:rounded-lg rounded-none gap-4 bg-background border-0 sm:-mx-2 mx-0"
            onClick={handlePlayPause}
            title={station.name}
        >
            <div className="flex items-center gap-3">
                <div className="relative">
                    <div className="sm:hidden block">
                        <Thumbnail size="48" imgSrc={station.favicon} stationName={station.name} />
                    </div>
                    <div className="sm:block hidden">
                        <Thumbnail size="56" imgSrc={station.favicon} stationName={station.name} />
                    </div>
                </div>
                <div className={`text-sm ${country ? "space-y-0.5" : ""}`}>
                    <div className="font-medium sm:break-words break-all max-w-lg line-clamp-1 text-foreground leading-tight">
                        {station.name}
                    </div>
                    <div className={`flex flex-col ${showClickCount || showBitrate ? "gap-y-1" : ""}`}>
                        <div className="line-clamp-1 text-muted-foreground text-xs">{country}</div>
                        <div className="flex gap-1">
                            <div
                                className={`${
                                    showClickCount ? "flex" : "hidden"
                                } bg-secondary text-secondary-foreground h-3 px-1.5 items-center text-xs w-fit gap-0.5 rounded-[2px]`}
                            >
                                <MousePointer2 size={14} /> {station.clickcount}
                            </div>
                            <div
                                className={`${
                                    showBitrate ? "flex" : "hidden"
                                } bg-secondary text-secondary-foreground h-3 px-1.5 items-center text-xs w-fit gap-0.5 rounded-[2px]`}
                            >
                                {station.bitrate && station.bitrate + " kbps"}
                            </div>
                        </div>
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
