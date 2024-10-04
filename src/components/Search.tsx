import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Searchbar from "../components/Searchbar";

const Search: React.FC = () => {
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate(); // For navigation

    const handleSearch = (term: string) => {
        if (term.trim() === "") {
            setError("Search query cannot be empty.");
            console.log(error);
            return;
        }
        setError(null);
        navigate(`/search/${encodeURIComponent(term)}`);
    };

    return <Searchbar onSearch={handleSearch} placeholder="Search stations..." />;
};

export default Search;
