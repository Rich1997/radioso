import React, { useEffect, useRef, useState } from "react";
import { Station } from "../utils/types";
import { getTopStations } from "../services/radioAPI";
import RadioStationGridItem from "./RadioStationGridItem";
import Subtitlebar from "./ui snippets/Subtitlebar";
import PaddedContainer from "./ui snippets/PaddedContainer";
import ScrollButtons from "./ui snippets/ScrollButtons";
import GridItemSkeleton from "./ui snippets/GridItemSkeleton";

const TopStations: React.FC = () => {
    const [topStations, setTopStations] = useState<Station[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        fetchTopStations();
    }, []);

    const fetchTopStations = async () => {
        try {
            setIsLoading(true);
            const stations = await getTopStations(50);
            setTopStations(stations);
        } catch (err) {
            setError("Failed to fetch top stations. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between">
                <Subtitlebar>Top Stations</Subtitlebar>
                <ScrollButtons containerRef={containerRef} contentLength={topStations.length} />
            </div>
            {error ? <PaddedContainer>{error}</PaddedContainer> : ""}

            <div className="pb-6 w-full">
                <div
                    ref={containerRef}
                    className="flex sm:gap-3 gap-4 overflow-x-auto scrollarea sx pb-4 sm:px-0 px-4 snap-x snap-mandatory"
                >
                    {isLoading ? <GridItemSkeleton /> : ""}
                    {topStations.map((station) => (
                        <RadioStationGridItem key={station.stationuuid} station={station} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default TopStations;
