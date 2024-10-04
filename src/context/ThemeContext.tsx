import { createContext, useContext, useLayoutEffect, useState, useCallback } from "react";

export type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
    systemTheme: "dark" | "light";
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
    systemTheme: "light",
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, setTheme] = useState<Theme>(() => {
        const storedValue = localStorage.getItem(storageKey);
        if (storedValue) {
            const [selectedTheme] = storedValue.split(":");
            return selectedTheme as Theme;
        }
        return defaultTheme;
    });

    const [systemTheme, setSystemTheme] = useState<"dark" | "light">(() =>
        window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
    );

    const updateSystemTheme = useCallback(
        (newSystemTheme: "dark" | "light") => {
            setSystemTheme(newSystemTheme);
            if (theme === "system") {
                localStorage.setItem(storageKey, `system:${newSystemTheme}`);
            }
        },
        [theme, storageKey]
    );

    useLayoutEffect(() => {
        const root = window.document.documentElement;

        const handleThemeChange = (event: MediaQueryListEvent) => {
            const newSystemTheme = event.matches ? "dark" : "light";
            updateSystemTheme(newSystemTheme);
        };

        const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
        mediaQueryList.addEventListener("change", handleThemeChange);

        // Initial setup
        root.classList.remove("light", "dark");
        if (theme === "system") {
            root.classList.add(systemTheme);
        } else {
            root.classList.add(theme);
        }

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === storageKey) {
                const [newTheme, newSystemTheme] = event.newValue?.split(":") || [];
                if (newTheme && newTheme !== theme) {
                    setTheme(newTheme as Theme);
                }
                if (newSystemTheme && (newSystemTheme === "dark" || newSystemTheme === "light")) {
                    updateSystemTheme(newSystemTheme);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            mediaQueryList.removeEventListener("change", handleThemeChange);
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [theme, systemTheme, storageKey, updateSystemTheme]);

    const updateTheme = (newTheme: Theme) => {
        const updatedValue = newTheme === "system" ? `system:${systemTheme}` : `${newTheme}:${systemTheme}`;
        localStorage.setItem(storageKey, updatedValue);
        setTheme(newTheme);
    };

    const value = {
        theme,
        setTheme: updateTheme,
        systemTheme,
    };

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (context === undefined) throw new Error("useTheme must be used within a ThemeProvider");
    return context;
};
