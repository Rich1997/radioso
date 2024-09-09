import React, { useMemo } from "react";
import RadioStation from "../RadioStation";
import { useRadioContext } from "../../context/RadioContext";
import PaddedFlexContainer from "../ui snippets/PaddedFlexContainer";
import Subtitlebar from "../ui snippets/Subtitlebar";

export const Favorites: React.FC = () => {
    const { favorites } = useRadioContext();

    const filteredFavorites = useMemo(() => {
        return favorites.filter((station) => station.name.toLowerCase());
    }, [favorites]);

    return (
        <div>
            <Subtitlebar>Favorites</Subtitlebar>

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
