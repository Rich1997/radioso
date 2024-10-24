import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { Station } from "../utils/types";
import { handleImageError } from "@/lib/utils";
import { getCurrentSong } from "@/services/radioAPI";

interface RadioContextType {
    currentStation: Station | null;
    isPlaying: boolean;
    recentlyPlayed: Station[];
    playStation: (station: Station) => void;
    pauseStation: () => void;
    setIsPlaying: (isPlaying: boolean) => void;
    currentSong: { name: string } | null;
    stationInfo: string | null;
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
}

const RadioContext = createContext<RadioContextType | undefined>(undefined);

export const RadioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentStation, setCurrentStation] = useState<Station | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [recentlyPlayed, setRecentlyPlayed] = useState<Station[]>([]);
    const [currentSong, setCurrentSong] = useState<{ name: string } | null>(null);
    const [stationInfo, setStationInfo] = useState<string | null>(null);
    const latestStationUrl = useRef<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const storedRecentlyPlayed = localStorage.getItem("recentlyPlayed");

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
        localStorage.setItem("recentlyPlayed", JSON.stringify(recentlyPlayed));
    }, [recentlyPlayed]);

    useEffect(() => {
        if (currentStation) {
            latestStationUrl.current = currentStation.url;
            setCurrentSong(null);
            setStationInfo(null);

            const fetchCurrentSong = async () => {
                if (currentStation.url !== latestStationUrl.current) return;
                try {
                    const result = await getCurrentSong(currentStation.url);
                    if (currentStation.url === latestStationUrl.current) {
                        if (result.song) {
                            setCurrentSong(result.song);
                            setStationInfo(null);
                        } else if (result.stationInfo) {
                            setCurrentSong(null);
                            setStationInfo(result.stationInfo);
                        } else {
                            setCurrentSong(null);
                            setStationInfo(null);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching current song:", error);
                }
            };

            fetchCurrentSong();
            const interval = setInterval(fetchCurrentSong, 30000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [currentStation]);

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

            // navigator.mediaSession.setActionHandler("previoustrack", () => {
            //     // Handle previous track functionality
            // });

            // navigator.mediaSession.setActionHandler("nexttrack", () => {
            //     // Handle next track functionality
            // });

            if (currentStation) {
                const fallbackImage = handleImageError(currentStation.name);

                const artwork = [
                    { src: currentStation.favicon, sizes: "96x96", type: "image/png" },
                    { src: currentStation.favicon, sizes: "128x128", type: "image/png" },
                    { src: currentStation.favicon, sizes: "192x192", type: "image/png" },
                    { src: currentStation.favicon, sizes: "256x256", type: "image/png" },
                    { src: currentStation.favicon, sizes: "384x384", type: "image/png" },
                    { src: currentStation.favicon, sizes: "512x512", type: "image/png" },
                ];

                const img = new Image();
                img.src = currentStation.favicon;
                img.onload = () => {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: currentStation.name,
                        artist: currentSong ? `${currentSong.name}` : currentStation.country,
                        artwork: artwork,
                    });
                };
                img.onerror = () => {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: currentStation.name,
                        artist: currentSong ? `${currentSong.name}` : currentStation.country,
                        artwork: artwork.map((item) => ({ ...item, src: fallbackImage })),
                    });
                };
            }
        }
    }, [currentStation, isPlaying, currentSong]);

    const playStation = (station: Station) => {
        setIsLoading(true);
        setCurrentStation(station);
        setIsPlaying(true);

        const updatedRecentlyPlayed = [
            station,
            ...recentlyPlayed.filter((s) => s.stationuuid !== station.stationuuid),
        ].slice(0, 100);
        setRecentlyPlayed(updatedRecentlyPlayed);
    };

    const pauseStation = () => {
        setIsPlaying(false);
        setIsLoading(false);
    };

    return (
        <RadioContext.Provider
            value={{
                currentStation,
                isPlaying,
                recentlyPlayed,
                playStation,
                pauseStation,
                setIsPlaying,
                currentSong,
                stationInfo,
                isLoading,
                setIsLoading,
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
