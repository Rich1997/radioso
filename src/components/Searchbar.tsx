import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SearchIcon from "./assets/icons/SearchIcon";

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
        <div className="flex gap-3 sm:bg-muted/40 bg-muted border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:rounded-lg rounded-full min-w-[230px] w-full md:w-[300px] group">
            <Button
                onClick={handleSearch}
                variant="ghost_alt"
                size="oo"
                className="sm:pl-3 pl-4 group-hover:text-foreground"
            >
                <SearchIcon size={14} />
            </Button>
            <Input
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={placeholder}
                className="flex-grow sm:h-auto h-12"
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default Searchbar;
