import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function concatenateFirstLetters(inputString: string) {
    const initialsArray = inputString
        .replace(/\d+/g, "")
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase());
    const result = initialsArray.join("");

    return result;
}

export function handleImageError(channelName: string) {
    return "https://placehold.co/192?text=" + concatenateFirstLetters(channelName);
}
