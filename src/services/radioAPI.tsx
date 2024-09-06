import { Station } from "../utils/types";

const BASE_URL = "https://de1.api.radio-browser.info/json";

export const searchStations = async (searchTerm: string): Promise<Station[]> => {
    try {
        const response = await fetch(`${BASE_URL}/stations/byname/${encodeURIComponent(searchTerm)}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.map(
            (station: any): Station => ({
                id: station.stationuuid,
                name: station.name,
                url: station.url,
                favicon: station.favicon || "https://placeholder.com/150",
            })
        );
    } catch (error) {
        console.error("Error searching stations:", error);
        throw error;
    }
};

export const getTopStations = async (limit: number = 10): Promise<Station[]> => {
    try {
        const response = await fetch(`${BASE_URL}/stations/topvote/${limit}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data.map(
            (station: any): Station => ({
                id: station.stationuuid,
                name: station.name,
                url: station.url,
                favicon: station.favicon || "https://placeholder.com/150",
            })
        );
    } catch (error) {
        console.error("Error fetching top stations:", error);
        throw error;
    }
};
