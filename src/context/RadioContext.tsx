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

    const setArtistInfo = (songInfo: { name: string } | null, station: Station) => {
        if (songInfo?.name) return songInfo.name;
        return station.country || station.state || station.homepage || "";
    };

    const updateMediaSessionMetadata = (station: Station, songInfo: { name: string } | null) => {
        if (!("mediaSession" in navigator)) return;

        const fallbackImage = handleImageError(station.name);
        const artwork = [
            { src: station.favicon, sizes: "96x96", type: "image/png" },
            { src: station.favicon, sizes: "128x128", type: "image/png" },
            { src: station.favicon, sizes: "192x192", type: "image/png" },
            { src: station.favicon, sizes: "256x256", type: "image/png" },
            { src: station.favicon, sizes: "384x384", type: "image/png" },
            { src: station.favicon, sizes: "512x512", type: "image/png" },
        ];

        const img = new Image();
        img.src = station.favicon;

        img.onload = () => {
            if (navigator.mediaSession) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: station.name,
                    artist: setArtistInfo(songInfo, station),
                    artwork: artwork,
                });
            }
        };

        img.onerror = () => {
            if (navigator.mediaSession) {
                navigator.mediaSession.metadata = new MediaMetadata({
                    title: station.name,
                    artist: setArtistInfo(songInfo, station),
                    artwork: artwork.map((item) => ({ ...item, src: fallbackImage })),
                });
            }
        };
    };

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
            updateMediaSessionMetadata(currentStation, null);
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
                            updateMediaSessionMetadata(currentStation, result.song);
                        } else if (result.stationInfo) {
                            setCurrentSong(null);
                            setStationInfo(result.stationInfo);
                            updateMediaSessionMetadata(currentStation, null);
                        } else {
                            setCurrentSong(null);
                            setStationInfo(null);
                            updateMediaSessionMetadata(currentStation, null);
                        }
                    }
                } catch (error) {
                    console.error("Error fetching current song:", error);
                    updateMediaSessionMetadata(currentStation, null);
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

            return () => {
                navigator.mediaSession.setActionHandler("play", null);
                navigator.mediaSession.setActionHandler("pause", null);
                navigator.mediaSession.setActionHandler("stop", null);
            };
        }
    }, [currentStation, isPlaying]);

    const playStation = (station: Station) => {
        if (currentStation?.stationuuid !== station.stationuuid) {
            setIsLoading(true);
            updateMediaSessionMetadata(station, null);
        }
        setCurrentStation(station);
        setIsPlaying(true);

        if (currentStation?.url_resolved == station.url_resolved) setIsLoading(false);

        const updatedRecentlyPlayed = [
            station,
            ...recentlyPlayed.filter((s) => s.stationuuid !== station.stationuuid),
        ].slice(0, 100);
        setRecentlyPlayed(updatedRecentlyPlayed);
    };

    const pauseStation = () => {
        setIsPlaying(false);
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
