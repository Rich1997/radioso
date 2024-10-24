import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { searchStations } from "../../services/radioAPI";
import { Station } from "../../utils/types";
import RadioStation from "../../components/RadioStation";
import Subtitlebar from "../ui snippets/Subtitlebar";
import GridContainer from "../ui snippets/GridContainer";
import Skeleton from "../ui snippets/Skeleton";
import PaddedContainer from "../ui snippets/PaddedContainer";

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
                setResults([]);
                return;
            }

            try {
                setIsLoading(true);
                setError(null);
                setResults([]);
                const searchResults = await searchStations(term);
                setResults(searchResults);
            } catch (err) {
                setError("Failed to search stations. Please try again.");
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchResults();
    }, [location]);

    return (
        <div className="w-full">
            <div className="sticky sm:top-[75px] top-[90px] bg-background z-10 sm:pt-8 pt-2 sm:-mx-4 sm:px-4 -mx-0">
                <Link to="/" className="text-sm font-normal text-muted-foreground hover:text-foreground sm:px-0 px-4">
                    ← Go back home
                </Link>
                <Subtitlebar>Search results for "{searchTerm || "..."}"</Subtitlebar>
                <div className="bg-gradient-to-b from-background via-transparent to-transparent w-full h-4 -mb-4 absolute sm:hidden block" />
            </div>
            <div className="pt-[1px]">
                {isLoading && (
                    <GridContainer>
                        <Skeleton />
                    </GridContainer>
                )}
                {error && <PaddedContainer>{error}</PaddedContainer>}

                {results.length > 0 && (
                    <GridContainer>
                        {results.map((station) => (
                            <RadioStation
                                key={station.stationuuid}
                                station={station}
                                favIcon={true}
                                showClickCount={true}
                                showBitrate={true}
                            />
                        ))}
                    </GridContainer>
                )}

                {results.length === 0 && !isLoading && !error && <PaddedContainer>No results found.</PaddedContainer>}
            </div>
        </div>
    );
};

export default SearchResults;
