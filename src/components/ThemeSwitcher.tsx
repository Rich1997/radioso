import { Moon, Sun, Laptop } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

type Theme = "light" | "dark" | "system";

export default function ThemeSwitcher() {
    const { setTheme, theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) {
        return null;
    }

    const options: { value: Theme; option: string; icon: React.ReactNode }[] = [
        { value: "dark", option: "Dark", icon: <Moon size={14} /> },
        { value: "light", option: "Light", icon: <Sun size={14} /> },
        { value: "system", option: "System", icon: <Laptop size={14} /> },
    ];

    return (
        <div className="flex items-center justify-center h-8">
            <div className="bg-background rounded-full border h-full w-full sm:flex hidden">
                {options.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => setTheme(option.value as Theme)}
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
            <div className="inline-flex sm:hidden relative">
                <select
                    id="theme"
                    className="absolute bg-background inset-0 opacity-0"
                    value={theme}
                    onChange={(e) => setTheme(e.target.value as Theme)}
                >
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.option}
                        </option>
                    ))}
                </select>
                <Button variant="outline" size="icon" className="rounded-full">
                    {theme === "dark" ? (
                        <Moon size={16} />
                    ) : theme === "light" ? (
                        <Sun size={16} />
                    ) : (
                        <Laptop size={16} />
                    )}
                </Button>
            </div>
        </div>
    );
}
