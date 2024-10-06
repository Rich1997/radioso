import { Theme } from "@/context/ThemeContext";

const scrollbarThemeController = (theme: Theme) => {
    let colorScheme;

    if (theme === "dark" || theme === "light") {
        colorScheme = theme;
    } else if (theme === "system" || theme === undefined) {
        colorScheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    } else {
        colorScheme = "light";
    }

    document.documentElement.setAttribute("data-color-scheme", colorScheme);
};

export default scrollbarThemeController;
