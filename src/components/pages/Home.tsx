import React from "react";
import RecentlyPlayed from "../RecentlyPlayed";
import TopStations from "../TopStations";

export const Home: React.FC = () => {
    return (
        <div className="w-full sm:pt-8 pt-2">
            <RecentlyPlayed />
            <TopStations />
        </div>
    );
};

export default Home;
