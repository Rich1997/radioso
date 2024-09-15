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
                stationuuid: station.stationuuid,
                name: station.name,
                url: station.url,
                url_resolved: station.url_resolved,
                homepage: station.homepage,
                favicon: station.favicon,
                tags: station.tags,
                country: station.country,
                countrycode: station.countrycode,
                state: station.state,
                language: station.language,
                votes: station.votes,
                lastchangetime: station.lastchangetime,
                codec: station.codec,
                bitrate: station.bitrate,
                hls: station.hls,
                lastcheckok: station.lastcheckok,
                lastchecktime: station.lastchecktime,
                clickcount: station.clickcount,
                clicktrend: station.clicktrend,
                ssl_error: station.ssl_error,
                geo_lat: station.geo_lat,
                geo_long: station.geo_long,
                has_extended_info: station.has_extended_info,
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
                stationuuid: station.stationuuid,
                name: station.name,
                url: station.url,
                url_resolved: station.url_resolved,
                homepage: station.homepage,
                favicon: station.favicon,
                tags: station.tags,
                country: station.country,
                countrycode: station.countrycode,
                state: station.state,
                language: station.language,
                votes: station.votes,
                lastchangetime: station.lastchangetime,
                codec: station.codec,
                bitrate: station.bitrate,
                hls: station.hls,
                lastcheckok: station.lastcheckok,
                lastchecktime: station.lastchecktime,
                clickcount: station.clickcount,
                clicktrend: station.clicktrend,
                ssl_error: station.ssl_error,
                geo_lat: station.geo_lat,
                geo_long: station.geo_long,
                has_extended_info: station.has_extended_info,
            })
        );
    } catch (error) {
        console.error("Error fetching top stations:", error);
        throw error;
    }
};
