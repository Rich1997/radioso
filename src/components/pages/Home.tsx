import React, { useEffect, useState } from "react";
import RadioStation from "../RadioStation";
import { Station } from "../../utils/types";
import { getTopStations } from "../../services/radioAPI";
import RecentlyPlayed from "../RecentlyPlayed";
import FlexContainer from "../ui snippets/FlexContainer";
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
        <div>
            <div className="sm:flex block gap-4">
                <RecentlyPlayed />

                {topStations.length > 0 && (
                    <div className="flex-1">
                        <div>{error && <p className="text-red-500">{error}</p>}</div>

                        <Subtitlebar>Top Stations</Subtitlebar>

                        <FlexContainer>
                            {topStations.map((station) => (
                                <RadioStation key={station.stationuuid} station={station} />
                            ))}
                        </FlexContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;
