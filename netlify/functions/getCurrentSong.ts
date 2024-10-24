import { Handler, HandlerResponse } from "@netlify/functions";
import * as icy from "icy";
import axios from "axios";

interface MetadataResult {
    currentSong?: string;
    stationInfo?: string;
}

const handler: Handler = async (event) => {
    const { stationUrl } = JSON.parse(event.body || "{}");

    if (!stationUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Station URL is required" }),
        };
    }

    console.log(`Attempting to fetch song info for: ${stationUrl}`);

    try {
        let result: MetadataResult = {};

        // Try SHOUTcast v2 metadata
        try {
            const response = await axios.get(`${stationUrl}/stats?json=1`, { timeout: 5000 });
            if (response.data && response.data.songtitle) {
                console.log(`SHOUTcast v2 metadata found: ${response.data.songtitle}`);
                result.currentSong = response.data.songtitle;
            }
        } catch (error) {
            console.log("Not a SHOUTcast v2 stream or couldn't fetch metadata");
        }

        // Try SHOUTcast v1 metadata
        if (!result.currentSong) {
            try {
                const response = await axios.get(`${stationUrl}/7.html`, { timeout: 5000 });
                const match = response.data.match(/<body>(.*?)<\/body>/);
                if (match && match[1]) {
                    const [, , currentSong] = match[1].split(",");
                    if (currentSong) {
                        console.log(`SHOUTcast v1 metadata found: ${currentSong}`);
                        result.currentSong = currentSong;
                    }
                }
            } catch (error) {
                console.log("Not a SHOUTcast v1 stream or couldn't fetch metadata");
            }
        }

        // Try Icecast2 JSON-based metadata
        if (!result.currentSong) {
            try {
                const response = await axios.get(`${stationUrl}/status-json.xsl`, { timeout: 5000 });
                if (response.data && response.data.icestats && response.data.icestats.source) {
                    const source = Array.isArray(response.data.icestats.source)
                        ? response.data.icestats.source[0]
                        : response.data.icestats.source;
                    if (source.title) {
                        console.log(`Icecast2 JSON metadata found: ${source.title}`);
                        result.currentSong = source.title;
                    }
                }
            } catch (error) {
                console.log("Not an Icecast2 stream or couldn't fetch JSON metadata");
            }
        }

        // Fall back to Icecast/ICY method
        if (!result.currentSong) {
            const icyResult = await new Promise<MetadataResult>((resolve) => {
                icy.get(stationUrl, (res) => {
                    let metadata = "";

                    res.on("metadata", (meta) => {
                        const parsed = icy.parse(meta);
                        if (parsed.StreamTitle) {
                            metadata = parsed.StreamTitle;
                            console.log(`ICY metadata found: ${metadata}`);
                        }
                    });

                    setTimeout(() => {
                        if (metadata) {
                            resolve({ currentSong: metadata });
                        } else {
                            const icyName = res.headers["icy-name"];
                            const icyDescription = res.headers["icy-description"];
                            const icyGenre = res.headers["icy-genre"];

                            console.log(
                                `ICY Headers: Name: ${icyName}, Description: ${icyDescription}, Genre: ${icyGenre}`
                            );

                            if (icyName || icyDescription || icyGenre) {
                                const stationInfo = `${icyName || ""} ${icyDescription || ""} ${icyGenre || ""}`.trim();
                                resolve({ stationInfo });
                            } else {
                                resolve({});
                            }
                        }
                        res.destroy();
                    }, 5000);
                }).on("error", (err) => {
                    console.error("Error connecting to radio stream:", err);
                    resolve({});
                });
            });

            result = { ...result, ...icyResult };
        }

        if (result.currentSong || result.stationInfo) {
            return {
                statusCode: 200,
                body: JSON.stringify(result),
            };
        }

        console.log("No metadata or station information found for this station");
        return {
            statusCode: 204,
            body: JSON.stringify({}),
        };
    } catch (error) {
        console.error("Error fetching current song:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch current song information" }),
        };
    }
};

export { handler };
