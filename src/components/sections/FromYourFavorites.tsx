import React, { useEffect, useRef, useState } from "react";
import { Station } from "@/utils/types";
import RadioStationGridItem from "../RadioStationGridItem";
import Subtitlebar from "../ui snippets/Subtitlebar";
import PaddedContainer from "../ui snippets/PaddedContainer";
import ScrollButtons from "../ui snippets/ScrollButtons";
import CarouselContainer from "../ui snippets/CarouselContainer";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FromYourFavorites: React.FC = () => {
    const [fromYourFavorites, setFromYourFavorites] = useState<Station[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const { favorites } = useFavoritesContext();

    useEffect(() => {
        fetchFromYourFavorites();
    }, [favorites]);

    const fetchFromYourFavorites = () => {
        setIsLoading(true);
        if (favorites.length > 0) {
            const stations = favorites.slice(0, 18);
            setFromYourFavorites(stations);
            setError(null);
        } else {
            setFromYourFavorites([]);
            setError("No favorites yet. Add some stations to your favorites list.");
        }
        setIsLoading(false);
    };

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between sm:pr-0 pr-4 gap-4">
                <Subtitlebar>From your favorites</Subtitlebar>
                <div className="flex items-center gap-6">
                    <Link to="/favorites" className="sm:pb-4 pb-2">
                        <Button variant="outline" size="oo" className="h-8 px-4 rounded-full">
                            View all
                        </Button>
                    </Link>
                    <ScrollButtons containerRef={containerRef} contentLength={fromYourFavorites.length} />
                </div>
            </div>
            {error ? <PaddedContainer>{error}</PaddedContainer> : ""}

            <CarouselContainer isLoading={isLoading} containerRef={containerRef}>
                {fromYourFavorites.map((station) => (
                    <RadioStationGridItem key={station.stationuuid} station={station} />
                ))}
            </CarouselContainer>
        </div>
    );
};

export default FromYourFavorites;
