import { colorThemes } from "@/utils/constants";
import React, { createContext, useContext, useState, useLayoutEffect } from "react";

export type ColorTheme = (typeof colorThemes)[number]["colorThemeName"];

interface ColorThemeContextProps {
    colorTheme: ColorTheme;
    setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextProps | undefined>(undefined);

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const storedColorTheme = localStorage.getItem("colorTheme");
    const initialColorTheme: ColorTheme = storedColorTheme ? (storedColorTheme as ColorTheme) : "default";

    const [colorTheme, setColorThemeState] = useState<ColorTheme>(initialColorTheme);

    const setColorTheme = (theme: ColorTheme) => {
        setColorThemeState(theme);
        localStorage.setItem("colorTheme", theme);
    };

    useLayoutEffect(() => {
        const root = window.document.body;

        localStorage.setItem("colorTheme", colorTheme);

        root.classList.remove("theme-default", "theme-blue", "theme-gold", "theme-orange", "theme-halloween");

        root.classList.add("theme-" + colorTheme);
    }, [colorTheme]);

    return <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>{children}</ColorThemeContext.Provider>;
};

export const useColorTheme = (): ColorThemeContextProps => {
    const context = useContext(ColorThemeContext);

    if (!context) {
        throw new Error("useColorTheme must be used within a ColorThemeProvider");
    }

    return context;
};
