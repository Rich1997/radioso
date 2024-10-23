import { Handler, HandlerResponse } from "@netlify/functions";
import * as icy from "icy";

const handler: Handler = async (event) => {
    const { stationUrl } = JSON.parse(event.body || "{}");

    if (!stationUrl) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Station URL is required" }),
        };
    }

    try {
        return await new Promise<HandlerResponse>((resolve) => {
            icy.get(stationUrl, (res) => {
                let metadata = "";

                res.on("metadata", (meta) => {
                    const parsed = icy.parse(meta);
                    if (parsed.StreamTitle) {
                        metadata = parsed.StreamTitle;
                    }
                });

                // Wait for a short time to capture metadata
                setTimeout(() => {
                    if (metadata) {
                        resolve({
                            statusCode: 200,
                            body: JSON.stringify({ currentSong: metadata }),
                        });
                    } else {
                        // If no metadata found, try to get it from headers
                        const icyName = res.headers["icy-name"];
                        const icyDescription = res.headers["icy-description"];
                        const icyGenre = res.headers["icy-genre"];

                        if (icyName || icyDescription || icyGenre) {
                            resolve({
                                statusCode: 200,
                                body: JSON.stringify({
                                    currentSong: `${icyName || ""} ${icyDescription || ""} ${icyGenre || ""}`.trim(),
                                }),
                            });
                        } else {
                            resolve({
                                statusCode: 404,
                                body: JSON.stringify({ error: "No current song information available" }),
                            });
                        }
                    }
                    res.destroy();
                }, 5000);
            }).on("error", (err) => {
                console.error("Error connecting to radio stream:", err);
                resolve({
                    statusCode: 500,
                    body: JSON.stringify({ error: "Failed to connect to radio stream" }),
                });
            });
        });
    } catch (error) {
        console.error("Error fetching current song:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Failed to fetch current song information" }),
        };
    }
};

export { handler };
