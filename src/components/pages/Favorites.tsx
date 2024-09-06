import React, { useState, useMemo } from "react";
import { FaPlay, FaStop } from "react-icons/fa"; // Import Play and Stop icons
import Search from "../Searchbar";
import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";

export const Favorites: React.FC = () => {
    const { playStation, toggleFavorite, favorites, currentStation, isPlaying } = useRadioContext();
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState<string | null>(null);

    const filteredFavorites = useMemo(() => {
        return favorites.filter((station) => station.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [favorites, searchTerm]);

    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setError(null);
    };

    return (
        <div>
            <div className="font-bold text-2xl pb-6 pt-4 sm:px-0 px-6">Favorites</div>

            <Search onSearch={handleSearch} placeholder="Search favorites" />

            {error && <p className="text-red-500">{error}</p>}

            <div className="space-y-2">
                {filteredFavorites.map((station) => {
                    const isCurrentlyPlaying = currentStation?.id === station.id && isPlaying;

                    return (
                        <RadioStation
                            key={station.id}
                            station={station}
                            isPlaying={isCurrentlyPlaying}
                            isFavorite={true}
                            onTogglePlay={() => playStation(station)}
                            onToggleFavorite={() => toggleFavorite(station)}
                            playIcon={
                                isCurrentlyPlaying ? <FaStop /> : <FaPlay /> // Use stop icon if playing, else play icon
                            }
                        />
                    );
                })}
            </div>

            {filteredFavorites.length === 0 && <p>No favorite stations found.</p>}
        </div>
    );
};

export default Favorites;
