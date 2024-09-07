import React, { createContext, useContext, useState, useEffect } from "react";
import { Station } from "../utils/types";

interface RadioContextType {
    currentStation: Station | null;
    isPlaying: boolean;
    favorites: Station[];
    recentlyPlayed: Station[];
    playStation: (station: Station) => void;
    pauseStation: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
    toggleFavorite: (station: Station) => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentStation, setCurrentStation] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [favorites, setFavorites] = useState<Station[]>([]);
    const [recentlyPlayed, setRecentlyPlayed] = useState<Station[]>([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        const storedRecentlyPlayed = localStorage.getItem("recentlyPlayed");

        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites) || []);
            } catch (error) {
                console.error("Error parsing favorites from localStorage", error);
                setFavorites([]);
            }
        }

        if (storedRecentlyPlayed) {
            try {
                setRecentlyPlayed(JSON.parse(storedRecentlyPlayed) || []);
            } catch (error) {
                console.error("Error parsing recentlyPlayed from localStorage", error);
                setRecentlyPlayed([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    useEffect(() => {
        localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
    }, [recentlyPlayed]);

    // Initialize Media Session API
    useEffect(() => {
        if ("mediaSession" in navigator) {
            navigator.mediaSession.setActionHandler("play", () => {
                if (currentStation && !isPlaying) {
                    setIsPlaying(true);
                }
            });

            navigator.mediaSession.setActionHandler("pause", () => {
                if (currentStation && isPlaying) {
                    setIsPlaying(false);
                }
            });

            navigator.mediaSession.setActionHandler("stop", () => {
                setIsPlaying(false);
            });

            navigator.mediaSession.setActionHandler("previoustrack", () => {
                // Handle previous track functionality if needed
            });

            navigator.mediaSession.setActionHandler("nexttrack", () => {
                // Handle next track functionality if needed
            });

            // Optionally set metadata (e.g., current station's info)
            if (currentStation) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: currentStation.name,
                    artwork: [{ src: currentStation.favicon, sizes: "96x96", type: "image/png" }],
                });
            }
        }
    }, [currentStation, isPlaying]);

    const playStation = (station: Station) => {
        setCurrentStation(station);
        setIsPlaying(true);

        const updatedRecentlyPlayed = [station, ...recentlyPlayed.filter((s) => s.id !== station.id)].slice(0, 5);
        setRecentlyPlayed(updatedRecentlyPlayed);
    };

    const pauseStation = () => {
        setIsPlaying(false); // Pause the current station
    };

    const toggleFavorite = (station: Station) => {
        if (favorites.some((fav) => fav.id === station.id)) {
            setFavorites(favorites.filter((fav) => fav.id !== station.id));
        } else {
            setFavorites([...favorites, station]);
        }
    };

    return (
        <RadioContext.Provider
            value={{
                currentStation,
                isPlaying,
                favorites,
                recentlyPlayed,
                playStation,
                pauseStation,
                setIsPlaying,
                toggleFavorite,
            }}
        >
            {children}
        </RadioContext.Provider>
    );
};

export const useRadioContext = () => {
    const context = useContext(RadioContext);
    if (context === undefined) {
        throw new Error("useRadioContext must be used within a RadioProvider");
    }
    return context;
};
