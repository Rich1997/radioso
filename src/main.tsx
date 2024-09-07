import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RadioProvider } from "./context/RadioContext.tsx";
import { ThemeProvider } from "./context/ThemeContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <ThemeProvider defaultTheme="light" storageKey="ui-theme">
        <RadioProvider>
            <App />
        </RadioProvider>
    </ThemeProvider>
);
