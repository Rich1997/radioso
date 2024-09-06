import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RadioProvider } from "./context/RadioContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <RadioProvider>
        <App />
    </RadioProvider>
);
