import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./themes.css";
import { RadioProvider } from "./context/RadioContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { FavoritesProvider } from "./context/FavoritesContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider>
        <RadioProvider>
            <FavoritesProvider>
                <App />
            </FavoritesProvider>
        </RadioProvider>
    </ThemeProvider>
);
