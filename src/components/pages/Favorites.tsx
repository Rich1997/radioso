import React, { useMemo } from "react";

import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";

export const Favorites: React.FC = () => {
    const { favorites } = useRadioContext();

    const filteredFavorites = useMemo(() => {
        return favorites.filter((station) => station.name.toLowerCase());
    }, [favorites]);

    return (
        <div>
            <div className="font-bold text-2xl pb-6 pt-4 sm:px-0 px-6">Favorites</div>

            <div className="space-y-2">
                {filteredFavorites.map((station) => {
                    return <RadioStation key={station.stationuuid} station={station} />;
                })}
            </div>

            {filteredFavorites.length === 0 && <p>No favorite stations found.</p>}
        </div>
    );
};

export default Favorites;
