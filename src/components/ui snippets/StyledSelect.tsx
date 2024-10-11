import React from "react";
import { ChevronDown } from "lucide-react";

interface StyledSelectProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: { value: string; label: string }[];
}

export default function StyledSelect({ value, onChange, options }: StyledSelectProps) {
    return (
        <div className="relative sm:hidden flex">
            <select
                value={value}
                onChange={onChange}
                className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring appearance-none cursor-pointer"
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
    );
}
