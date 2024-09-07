import React, { useMemo } from "react";

import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";
import Titlebar from "../ui snippets/Titlebar";
import PaddedFlexContainer from "../ui snippets/PaddedFlexContainer";

export const Favorites: React.FC = () => {
    const { favorites } = useRadioContext();

    const filteredFavorites = useMemo(() => {
        return favorites.filter((station) => station.name.toLowerCase());
    }, [favorites]);

    return (
        <div>
            <Titlebar>Favorites</Titlebar>

            <PaddedFlexContainer>
                <div className="space-y-2">
                    {filteredFavorites.map((station) => {
                        return <RadioStation key={station.stationuuid} station={station} />;
                    })}
                </div>

                {filteredFavorites.length === 0 && <p>No favorite stations found.</p>}
            </PaddedFlexContainer>
        </div>
    );
};

export default Favorites;
