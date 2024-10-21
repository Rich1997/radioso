import React from "react";
import RecentlyPlayed from "../sections/RecentlyPlayed";
import FromYourFavorites from "../sections/FromYourFavorites";
import BottomPromo from "../sections/BottomPromo";

export const Home: React.FC = () => {
    return (
        <div className="w-full sm:pt-8 pt-2">
            <RecentlyPlayed />
            <FromYourFavorites />
            <BottomPromo show={true} />
        </div>
    );
};

export default Home;
