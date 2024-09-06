import React, { useEffect, useState } from "react";
import Search from "../Search"; // Import the updated SearchComponent
import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";
import { Station } from "../../utils/types";
import { getTopStations } from "../../services/radioAPI";
import RecentlyPlayed from "../RecentlyPlayed";

export const Home: React.FC = () => {
    const { playStation, toggleFavorite, favorites } = useRadioContext();
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
            <h1 className="text-2xl font-bold mb-4">Radio Browser</h1>

            <Search />

            {error && <p className="text-red-500">{error}</p>}

            <RecentlyPlayed />

            {topStations.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-2">Top Stations</h2>
                    <div className="space-y-2">
                        {topStations.map((station) => (
                            <RadioStation
                                key={station.id}
                                station={station}
                                isPlaying={false}
                                isFavorite={favorites.some((fav) => fav.id === station.id)}
                                onTogglePlay={() => playStation(station)}
                                onToggleFavorite={() => toggleFavorite(station)}
                            />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;
