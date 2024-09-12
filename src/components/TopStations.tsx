import React, { useEffect, useState } from "react";
import { Station } from "../utils/types";
import { getTopStations } from "../services/radioAPI";
import RadioStation from "./RadioStation";
import GridContainer from "./ui snippets/GridContainer";
import Subtitlebar from "./ui snippets/Subtitlebar";

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

    if (isLoading) {
        return <div>Loading top stations...</div>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="flex-1">
            <Subtitlebar>Top Stations</Subtitlebar>
            <GridContainer>
                {topStations.map((station) => (
                    <RadioStation key={station.stationuuid} station={station} favIcon={true} />
                ))}
            </GridContainer>
        </div>
    );
};

export default TopStations;
