import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchProps {
    onSearch: (term: string) => void;
    placeholder?: string;
}

export const Searchbar: React.FC<SearchProps> = ({ onSearch, placeholder = "Enter station name" }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    };

    return (
        <div className="flex space-x-2 mb-4">
            <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="flex-grow"
                onKeyDown={handleKeyPress}
            />
            <Button onClick={handleSearch} variant="outline">
                Search
            </Button>
        </div>
    );
};

export default Searchbar;
