import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchStations } from "../../services/radioAPI";
import { Station } from "../../utils/types";
import RadioStation from "../../components/RadioStation";
import Subtitlebar from "../ui snippets/Subtitlebar";
import FlexContainer from "../ui snippets/FlexContainer";

const SearchResults: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [results, setResults] = useState<Station[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();

    useEffect(() => {
        const fetchResults = async () => {
            const term = decodeURIComponent(location.pathname.split("/")[2] || "").trim();
            setSearchTerm(term);

            if (term === "") {
                setError("Search query cannot be empty.");
                setResults([]); // Clear results for empty search term
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                const searchResults = await searchStations(term);
                setResults(searchResults);
            } catch (err) {
                setError("Failed to search stations. Please try again.");
                setResults([]); // Clear results on error
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [location]);

    return (
        <>
            <div className="sticky sm:top-[129px] top-[169px] bg-background z-10">
                <Link to="/" className="text-sm font-normal">
                    ↑ Go back home
                </Link>
                <Subtitlebar>Search Results for "{searchTerm || "..."}"</Subtitlebar>
            </div>
            <div>
                <div>{isLoading && <p>Searching...</p>}</div>
                {error && <p className="text-red-500">{error}</p>}

                {results.length > 0 && (
                    <FlexContainer>
                        {results.map((station) => (
                            <RadioStation key={station.stationuuid} station={station} />
                        ))}
                    </FlexContainer>
                )}

                <div>{results.length === 0 && !isLoading && !error && <p>No results found.</p>}</div>
            </div>
        </>
    );
};

export default SearchResults;
