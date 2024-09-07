import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Searchbar from "../../components/Searchbar";
import { searchStations } from "../../services/radioAPI";
import { Station } from "../../utils/types";
import RadioStation from "../../components/RadioStation";

const SearchResults: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [results, setResults] = useState<Station[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();

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

    const handleSearch = (term: string) => {
        if (term.trim() === "") {
            setError("Search query cannot be empty.");
            return;
        }
        navigate(`/search/${encodeURIComponent(term)}`);
    };

    return (
        <div>
            <Searchbar onSearch={handleSearch} placeholder="Search stations..." />
            <h1 className="text-2xl font-bold mb-4">Search Results for "{searchTerm || "..."}"</h1>
            {isLoading && <p>Searching...</p>}
            {error && <p className="text-red-500">{error}</p>}

            {results.length > 0 && (
                <div className="space-y-2 mt-4">
                    {results.map((station) => (
                        <RadioStation key={station.id} station={station} />
                    ))}
                </div>
            )}

            {results.length === 0 && !isLoading && !error && <p>No results found.</p>}
        </div>
    );
};

export default SearchResults;
