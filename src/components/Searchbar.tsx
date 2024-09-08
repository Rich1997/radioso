import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaSearch } from "react-icons/fa";

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
        <div className="flex gap-3 bg-muted/30 border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md min-w-[230px] w-full sm:w-[300px]">
            <Button onClick={handleSearch} variant="ghost" size="oo" className="pl-3">
                <FaSearch />
            </Button>
            <Input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="flex-grow"
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default Searchbar;
