import React from "react";
import { ChevronDown } from "lucide-react";

interface StyledSelectProps<T> {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    options: T[];
    optionValueKey: keyof T;
    optionLabelKey: keyof T;
}

export default function StyledSelect<T>({
    value,
    onChange,
    options,
    optionValueKey,
    optionLabelKey,
}: StyledSelectProps<T>) {
    return (
        <div className="relative sm:hidden flex">
            <select
                value={value}
                onChange={onChange}
                className="w-full h-10 px-3 py-2 text-sm bg-background border border-input rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-ring focus:border-ring appearance-none cursor-pointer"
            >
                {options.map((option) => (
                    <option key={String(option[optionValueKey])} value={String(option[optionValueKey])}>
                        {String(option[optionLabelKey])}
                    </option>
                ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
    );
}
