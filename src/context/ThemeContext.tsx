import React, { createContext, useContext, useLayoutEffect, useState } from "react";

export type Theme = "light" | "dark" | "system";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("system");
    const [themeChannel, setThemeChannel] = useState<BroadcastChannel | null>(null);

    useLayoutEffect(() => {
        const storedTheme = localStorage.getItem("theme") as Theme | null;
        if (storedTheme) {
            setTheme(storedTheme);
        }

        const channel = new BroadcastChannel("theme_channel");
        setThemeChannel(channel);

        channel.onmessage = (event) => {
            if (event.data && event.data.type === "theme_change") {
                setTheme(event.data.theme);
            }
        };

        return () => {
            channel.close();
        };
    }, []);

    useLayoutEffect(() => {
        localStorage.setItem("theme", theme);

        if (themeChannel) {
            themeChannel.postMessage({ type: "theme_change", theme });
        }

        if (theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme, themeChannel]);

    useLayoutEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                if (mediaQuery.matches) {
                    document.documentElement.classList.add("dark");
                } else {
                    document.documentElement.classList.remove("dark");
                }
            }
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => mediaQuery.removeEventListener("change", handleChange);
    }, [theme]);

    const value = {
        theme,
        setTheme: (newTheme: Theme) => {
            setTheme(newTheme);
        },
    };

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
