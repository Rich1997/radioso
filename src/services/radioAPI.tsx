import axios from "axios";
import { Station } from "../utils/types";

const BASE_URL = "https://de1.api.radio-browser.info/json";

export interface CurrentSong {
    name: string;
}

export interface CurrentSongResult {
    song: CurrentSong | null;
    stationInfo: string | null;
}

export const searchStations = async (searchTerm: string): Promise<Station[]> => {
    try {
        const { data } = await axios.get(`${BASE_URL}/stations/byname/${encodeURIComponent(searchTerm)}`);
        return data
            .map(
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
            )
            .sort((a: Station, b: Station) => (b.clickcount || 0) - (a.clickcount || 0));
    } catch (error) {
        console.error("Error searching stations:", error);
        throw error;
    }
};

export const getTopStations = async (limit: number = 10): Promise<Station[]> => {
    try {
        const { data } = await axios.get(`${BASE_URL}/stations/topvote/${limit}`);
        const filteredStations = data.filter((station: Station) => station.countrycode === "US").slice(0, 10);
        return filteredStations.map(
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

export const getCurrentSong = async (stationUrl: string): Promise<CurrentSongResult> => {
    try {
        const { data } = await axios.post("/.netlify/functions/getCurrentSong", { stationUrl });

        if (data.currentSong) {
            return { song: { name: data.currentSong }, stationInfo: null };
        } else if (data.stationInfo) {
            console.log("Station info:", data.stationInfo);
            return { song: null, stationInfo: data.stationInfo };
        } else {
            console.log("No song or station information available");
            return { song: null, stationInfo: null };
        }
    } catch (error) {
        console.error("Error fetching current song:", error);
        return { song: null, stationInfo: null };
    }
};
