import React from "react";
import { useRadioContext } from "../context/RadioContext";
import RadioStation from "./RadioStation";

const RecentlyPlayed: React.FC = () => {
    const { playStation, toggleFavorite, favorites, recentlyPlayed, currentStation, isPlaying } = useRadioContext();

    if (recentlyPlayed.length === 0) {
        return null; // Hide the section if there are no recently played stations
    }

    return (
        <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Recently Played</h2>
            <div className="space-y-2">
                {recentlyPlayed.map((station) => (
                    <RadioStation
                        key={station.id}
                        station={station}
                        isPlaying={currentStation?.id === station.id && isPlaying}
                        isFavorite={favorites.some((fav) => fav.id === station.id)}
                        onTogglePlay={() => playStation(station)}
                        onToggleFavorite={() => toggleFavorite(station)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RecentlyPlayed;
