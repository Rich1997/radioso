import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";

type Theme = "light" | "dark" | "system";

export default function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    const options: { value: Theme; icon: React.ReactNode }[] = [
        { value: "dark", icon: <Moon size={14} /> },
        { value: "light", icon: <Sun size={14} /> },
        { value: "system", icon: <Laptop size={14} /> },
    ];

    return (
        <div className="flex items-center justify-center h-8">
            <div className="bg-background rounded-full flex border h-full w-full">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setTheme(option.value.toLowerCase() as Theme)}
                        className={`p-2 rounded-full ${
                            theme === option.value
                                ? "outline outline-1 outline-border text-foreground"
                                : "hover:text-foreground text-muted-foreground"
                        }`}
                        aria-label={`Set theme to ${option.value}`}
                    >
                        {option.icon}
                    </button>
                ))}
            </div>
        </div>
    );
}
