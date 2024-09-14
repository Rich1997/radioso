import React from "react";
import RecentlyPlayed from "../RecentlyPlayed";
import TopStations from "../TopStations";

export const Home: React.FC = () => {
    return (
        <div className="sm:pt-8 pt-6 w-full">
            <RecentlyPlayed />
            <TopStations />
        </div>
    );
};

export default Home;
