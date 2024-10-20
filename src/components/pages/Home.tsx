import React from "react";
import RecentlyPlayed from "../sections/RecentlyPlayed";
import FromYourFavorites from "../sections/FromYourFavorites";

export const Home: React.FC = () => {
    return (
        <div className="w-full sm:pt-8 pt-2">
            <RecentlyPlayed />
            <FromYourFavorites />
        </div>
    );
};

export default Home;
