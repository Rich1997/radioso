import React, { useEffect, useState } from "react";
import { Station } from "../utils/types";
import { getTopStations } from "../services/radioAPI";
import RadioStation from "./RadioStation";
import GridContainer from "./ui snippets/GridContainer";
import Subtitlebar from "./ui snippets/Subtitlebar";
import Skeleton from "./ui snippets/Skeleton";
import PaddedContainer from "./ui snippets/PaddedContainer";

const TopStations: React.FC = () => {
    const [topStations, setTopStations] = useState<Station[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchTopStations();
    }, []);

    const fetchTopStations = async () => {
        try {
            setIsLoading(true);
            const stations = await getTopStations(10);
            setTopStations(stations);
        } catch (err) {
            setError("Failed to fetch top stations. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex-1">
            <Subtitlebar>Top Stations</Subtitlebar>
            {error ? <PaddedContainer>{error}</PaddedContainer> : ""}

            <GridContainer>
                {isLoading ? <Skeleton /> : ""}
                {topStations.map((station) => (
                    <RadioStation key={station.stationuuid} station={station} favIcon={true} />
                ))}
            </GridContainer>
        </div>
    );
};

export default TopStations;
