import React, { useEffect, useState } from "react";
import RadioStation from "../RadioStation";
import { Station } from "../../utils/types";
import { getTopStations } from "../../services/radioAPI";
import RecentlyPlayed from "../RecentlyPlayed";
import PaddedFlexContainer from "../ui snippets/PaddedFlexContainer";
import Titlebar from "../ui snippets/Titlebar";
import Subtitlebar from "../ui snippets/Subtitlebar";

export const Home: React.FC = () => {
    const [topStations, setTopStations] = useState<Station[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchTopStations();
    }, []);

    const fetchTopStations = async () => {
        try {
            const stations = await getTopStations(10);
            setTopStations(stations);
        } catch (err) {
            setError("Failed to fetch top stations. Please try again later.");
        }
    };

    return (
        <div className="h-full w-full">
            <Titlebar>Radio Browser</Titlebar>
            <div className="sm:flex block">
                <RecentlyPlayed />

                {topStations.length > 0 && (
                    <div className="flex-1">
                        <div className="px-4">{error && <p className="text-red-500">{error}</p>}</div>

                        <Subtitlebar>Top Stations</Subtitlebar>

                        <PaddedFlexContainer>
                            {topStations.map((station) => (
                                <RadioStation key={station.stationuuid} station={station} />
                            ))}
                        </PaddedFlexContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
