import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar";

const Search: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // For navigation

    const handleSearch = (term: string) => {
        if (term.trim() === "") {
            setError("Search query cannot be empty.");
            return;
        }
        setError(null);
        navigate(`/search/${encodeURIComponent(term)}`);
    };

    return (
        <div>
            <Searchbar onSearch={handleSearch} placeholder="Search stations..." />
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default Search;
