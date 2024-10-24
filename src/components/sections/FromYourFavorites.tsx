import React, { useEffect, useRef, useState } from "react";
import { Station } from "@/utils/types";
import RadioStationGridItem from "../RadioStationGridItem";
import Subtitlebar from "../ui snippets/Subtitlebar";
import ScrollButtons from "../ui snippets/ScrollButtons";
import CarouselContainer from "../ui snippets/CarouselContainer";
import { useFavoritesContext } from "@/context/FavoritesContext";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const FromYourFavorites: React.FC = () => {
    const [fromYourFavorites, setFromYourFavorites] = useState<Station[]>([]);
    const [isEmpty, setIsEmpty] = useState<boolean>(true);
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
            setIsEmpty(false);
        } else {
            setFromYourFavorites([]);
            setIsEmpty(true);
        }
        setIsLoading(false);
    };

    if (!isLoading && isEmpty) {
        return null;
    }

    if (isLoading && isEmpty) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center justify-between sm:pr-0 pr-4 gap-4">
                <Subtitlebar>From your favorites</Subtitlebar>
                <div className="flex items-center gap-6">
                    <Link to="/favorites" className="sm:pb-4 pb-2">
                        <Button variant="outline" size="oo" className="h-8 px-4 rounded-full sm:block hidden">
                            View all
                        </Button>
                        <Button variant="ghost_alt" size="oo" className="sm:hidden block">
                            View all →
                        </Button>
                    </Link>
                    <ScrollButtons containerRef={containerRef} contentLength={fromYourFavorites.length} />
                </div>
            </div>
            <CarouselContainer isLoading={isLoading} containerRef={containerRef}>
                {fromYourFavorites.map((station) => (
                    <RadioStationGridItem key={station.stationuuid} station={station} />
                ))}
            </CarouselContainer>
        </div>
    );
};

export default FromYourFavorites;
