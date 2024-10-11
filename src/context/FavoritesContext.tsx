import React, { createContext, useContext, useState, useEffect } from "react";
import { Station } from "../utils/types";

interface FavoritesContextType {
    favorites: Station[];
    toggleFavorite: (station: Station) => void;
    exportFavorites: () => string;
    importFavorites: (importedFavorites: Station[], mode: "overwrite" | "append") => void;
    isImporting: boolean;
    cancelImport: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [favorites, setFavorites] = useState<Station[]>([]);
    const [isImporting, setIsImporting] = useState(false);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            try {
                setFavorites(JSON.parse(storedFavorites) || []);
            } catch (error) {
                console.error("Error parsing favorites from localStorage", error);
                setFavorites([]);
            }
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const toggleFavorite = (station: Station) => {
        if (favorites.some((fav) => fav.stationuuid === station.stationuuid)) {
            setFavorites(favorites.filter((fav) => fav.stationuuid !== station.stationuuid));
        } else {
            setFavorites([...favorites, station]);
        }
    };

    const exportFavorites = (): string => {
        return JSON.stringify(favorites);
    };

    const importFavorites = (importedFavorites: Station[], mode: "overwrite" | "append") => {
        setIsImporting(true);

        setTimeout(() => {
            try {
                if (mode === "overwrite") {
                    setFavorites(importedFavorites);
                } else {
                    setFavorites((prevFavorites) => {
                        const newFavorites = [...prevFavorites];
                        importedFavorites.forEach((station) => {
                            if (!newFavorites.some((fav) => fav.stationuuid === station.stationuuid)) {
                                newFavorites.push(station);
                            }
                        });
                        return newFavorites;
                    });
                }
            } catch (error) {
                console.error("Error importing favorites:", error);
            } finally {
                setIsImporting(false);
            }
        }, 1000);
    };

    const cancelImport = () => {
        setIsImporting(false);
    };

    return (
        <FavoritesContext.Provider
            value={{
                favorites,
                toggleFavorite,
                exportFavorites,
                importFavorites,
                isImporting,
                cancelImport,
            }}
        >
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavoritesContext = () => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavoritesContext must be used within a FavoritesProvider");
    }
    return context;
};
