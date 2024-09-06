import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/pages/Home";
import Favorites from "./components/pages/Favorites";
import SearchResults from "./components/pages/SearchResults";

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="favorites" element={<Favorites />} />
                    <Route path="/search/:searchterm" element={<SearchResults />} />
                </Route>
            </Routes>
        </Router>
    );
};

export default App;
